import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import CheddaDropManager from '../../artifacts/CheddaDropManager.json'
import NFTWhitelistDrop from '../../artifacts/NFTWhitelistDrop.json'
import { Drop, DropMetadata } from '../drops/drop.model';

@Injectable({
  providedIn: 'root'
})
export class DropManagerService {

  managerContract

  constructor(private provider: DefaultProviderService, private wallet: WalletProviderService, private http: HttpClient) {
    this.managerContract = new ethers.Contract(
      wallet.currentConfig.contracts.CheddaDropManager,
      CheddaDropManager.abi,
      provider.provider
      );
  }

  async getDrops(): Promise<Drop[]> {
    let drops = await this.managerContract.getDrops()
    console.log('drops are: ', drops)
    return await this.populateDropMetadata(drops)
  }

  async getDrop(id: string): Promise<Drop> {
    let drop = await this.managerContract.getDrop(id)
    drop = await this.populateSingleDropMetadata(drop)
    return drop
  }

  async enterDrop(dropAddress: string) {
    console.log('entering drop: ', dropAddress)
    let dropContract = this.getNFTDropContract(dropAddress)
    await dropContract.connect(this.wallet.signer).enter()
  }

  async hasEntered(dropAddress: string) {
    let dropContract = this.getNFTDropContract(dropAddress)
    return await dropContract.hasEntered(this.wallet.currentAccount)
  }

  async canEnterDrop() {

  }

  async dropIsOpen(dropAddress: string) {
    let dropContract = this.getNFTDropContract(dropAddress) 
    return await dropContract.isOpen()
  }

  private getNFTDropContract(contractAddress: string) {
    return new ethers.Contract(
      contractAddress, NFTWhitelistDrop.abi, this.provider.provider
    )
  }

  private async populateDropMetadata(drops: Drop[]): Promise<Drop[]> {
    let populated = await Promise.all(drops.map(async d => {
      return this.populateSingleDropMetadata(d)
    }))
    return populated
  }

  private async populateSingleDropMetadata(drop: Drop): Promise<Drop> {
    let metadata = await this.http.get<DropMetadata>(drop.metadataURI).toPromise()
    console.log('metadata = ', metadata)
    let d = {
      ...drop,
      metadata
    }
    return d
  }
}
