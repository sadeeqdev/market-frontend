import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { HttpClient } from '@angular/common/http';
import CheddaDapStore from '../../artifacts/CheddaDappStore.json'
import { Dapp, DappMetadata } from '../dapps/models/dapp.model';
import { WalletProviderService } from '../providers/wallet-provider.service';

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
      console.log('contract is ', this.dappStoreContract);
      console.log('at address: ', this.dappStoreContract.address)
  }

  isCheddaStore() {
    return this.dappStoreContract.isCheddaStore();
  }

  async getDapps() {
    let dapps = await this.dappStoreContract.dapps()
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
    let dapps = await this.dappStoreContract.getDappsInCategory(category)
    let populated = this.populateMetadata(dapps)
    return populated
  }

  async populateMetadata(dapps: Dapp[]) {
    let populated = await Promise.all(dapps.map(async d => {
      let metadata = await this.http.get<DappMetadata>(d.metadataURI).toPromise()

      let dapp = {
        ...d,
        rating: this.randomRating(),
        metadata
      }
      return dapp
    }))
    return populated
  }

  randomRating() {
    return Math.ceil(Math.random() * 5)
  }
}
