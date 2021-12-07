import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { HttpClient } from '@angular/common/http';
import CheddaDapStore from '../../artifacts/CheddaDappStore.json'
import { Dapp, DappMetadata, DappWithRating } from '../dapps/models/dapp.model';
import { WalletProviderService } from '../providers/wallet-provider.service';
import moment from 'moment'

@Injectable({
  providedIn: 'root'
})

export class CheddaDappStoreService {

  dappStoreContract: any
  dapps: Dapp[]

  constructor(provider: DefaultProviderService, wallet: WalletProviderService, private http: HttpClient) {
    this.dappStoreContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaDappStore,
      CheddaDapStore.abi,
      provider.provider
      );
  }

  isCheddaStore() {
    return this.dappStoreContract.isCheddaStore();
  }

  async loadDapps() {
    let dapps = await this.dappStoreContract.dappsWithRatings()
    console.log('dapps are: ', dapps)
    dapps = await this.populateMetadata(dapps)
    return dapps
  }

  async loadDappAtAddress(address: string): Promise<Dapp> {
    let dapp = await this.dappStoreContract.getDapp(address)
    let metadata = await this.http.get<DappMetadata>(dapp.metadataURI).toPromise() 
    dapp = {... dapp, metadata}
    return dapp
  }

  async loadDappsInCategory(category: string): Promise<Dapp[]> {
    console.log('loading dapps in category: ', category)
    let dapps = await this.dappStoreContract.dappsInCategory(category)
    let populated = this.populateMetadata(dapps)
    return populated
  }

  async loadFeaturedDapps(): Promise<Dapp[]> {
    let dapps = await this.dappStoreContract.featuredDapps()
    let populated = this.populateMetadata(dapps)
    return populated
  }  
  
  async loadNewDapps(): Promise<Dapp[]> {
    const last30days = moment().subtract(30, 'days').unix()
    let dapps = await this.dappStoreContract.newDapps(last30days)
    let populated = this.populateMetadata(dapps)
    return populated
  }

  async loadPopularDapps(): Promise<Dapp[]> {
    let dapps = await this.dappStoreContract.popularDapps()
    let populated = this.populateMetadata(dapps)
    return populated
  }

  async populateMetadata(dapps: DappWithRating[]) {
    let populated = await Promise.all(dapps.map(async d => {
      try {
        let metadata = await this.http.get<DappMetadata>(d.dapp.metadataURI).toPromise()

        let dapp = {
          ...d.dapp,
          rating: d.rating.averageRating.div(100).toNumber(),
          averageRating: d.rating.averageRating,
          numerOfRatings: d.rating.numberOfRatings,
          metadata
        }
        return dapp
      } catch (error) {
        return {
          ...d.dapp,
          averageRating: d.rating.averageRating,
          numerOfRatings: d.rating.numberOfRatings,
        }
      }

    }))
    return populated
  }

  randomRating() {
    return Math.ceil(Math.random() * 5)
  }
}
