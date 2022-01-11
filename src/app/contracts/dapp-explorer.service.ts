import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import DappExplorer from '../../artifacts/CheddaDappExplorer.json'
import { Dapp } from '../dapps/models/dapp.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface Review {
  id: BigNumber
  author: string
  contentURI: string
  credibility: BigNumber
  spamCount: BigNumber
  timestamp: BigNumber
  review: string
}
export interface ReviewContent {
  review: string
}
@Injectable({
  providedIn: 'root'
})
export class DappExplorerService {

  ratingSubject = new Subject<any>()
  reviewSubject = new Subject<any>()
  reviewVoteSubject = new Subject<any>()

  private dappExplorerContract: any
  private RatingMultiplier = 100

  constructor(
    private provider: DefaultProviderService,
    private wallet: WalletProviderService,
    private http: HttpClient
  ) { 
    this.dappExplorerContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaDappExplorer,
      DappExplorer.abi,
      provider.provider
      );
      this.registerEventListeners()
  }

  async addRating(rating: number, dapp: Dapp) {
    const weightedRating = rating * this.RatingMultiplier
    console.log('sending rating: ', weightedRating)
    await this.dappExplorerContract.connect(this.wallet.signer).addRating(dapp.contractAddress, weightedRating)
  }

  async addReview(reviewUri: string, rating: number, dapp: Dapp) {
    const weightedRating = rating * this.RatingMultiplier
    await this.dappExplorerContract.connect(this.wallet.signer).addReview(dapp.contractAddress, reviewUri, weightedRating)
  }

  async averageRating(dapp: Dapp) {
    let averageRating = await this.dappExplorerContract.averageRating(dapp.contractAddress)
    return averageRating
  }

  async numberOfRatings(dapp: Dapp) {
    let numberOfRatings = await this.dappExplorerContract.numberOfRatings(dapp.contractAddress)
    return numberOfRatings
  }

  async loadReviews(dapp: Dapp) {
    let reviews = await this.dappExplorerContract.getReviews(dapp.contractAddress)
    reviews = await this.loadReviewsContent(reviews)
    console.log('reviews = ', reviews)
    return reviews
  }

  async voteOnReview(dapp: Dapp, reviewId: string, vote: number) {
    let response = await this.dappExplorerContract.connect(this.wallet.signer).voteOnReview(dapp.contractAddress, reviewId, vote)
    return response
  }

  async loadReviewsWithVotes(dapp: Dapp) {
    let reviews = await this.dappExplorerContract.getReviewsWithVotes(dapp.contractAddress)
    reviews = reviews.map(r => {
      return {
        ...r.review,
        vote: r.myVote
      }
    })
    reviews = await this.loadReviewsContent(reviews)
    console.log('reviewsWithVotes = ', reviews)
    return reviews
  }

  private async loadReviewsContent(reviews: Review[]) {
    let populated = Promise.all(reviews.map(async r => {
      return await this.downloadContent(r)
    }))
    return populated
  }

  private async downloadContent(review: Review): Promise<Review> {
    let content = await this.http.get<ReviewContent>(review.contentURI).toPromise()
    return {
      ...review,
      review: content.review
    }
  }

  private registerEventListeners() {
    this.dappExplorerContract.on('RatingAdded',async (contractAddress, user) => {
      this.ratingSubject.next({
        contractAddress,
        user
      })
    })
    this.dappExplorerContract.on('ReviewAdded',async (contractAddress, user, rating) => {
      this.reviewSubject.next({
        contractAddress,
        user,
        rating
      }) 
    })
    this.dappExplorerContract.on('ReviewVoted',async (contractAddress, user, reviewId, vote) => {
      this.reviewVoteSubject.next({
        contractAddress,
        user,
        reviewId,
        vote
      })
    })
  }
}
