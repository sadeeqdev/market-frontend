import { Injectable } from '@angular/core';
import { ethers, providers, Signer,  } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NetworkParams } from './network-params.interface';
import { CheddaConfig } from './chedda-config.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletProviderService {
  
  provider: any
  web3
  signer: Signer

  currentAccount
  currentNetwork: NetworkParams
  currentConfig: CheddaConfig
  isConnected: boolean = false
  connectedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  accountSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  networkSubject: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() {
    this.initializeNetworkConnection()
  }

  async isConected(): Promise<boolean> {
    try {
      this.provider = await detectEthereumProvider();
      console.log('connected provider is ', this.provider)
      if (this.provider) {
        await this.startApp(this.provider)
      }
    } catch (error) {
      console.error('unable to detect ethereum provider: ', error)
    }

    return this.provider && await this.provider.isConnected();
  }

  async startApp(provider: any) {
    let eth: any = window.ethereum
    if (eth.selectedAddress) {
      eth.enable()
      this.setCurrentAccount(eth.selectedAddress)
      console.log('selected address is ', eth.selectedAddress)
    } else {
    }
    if (provider !== window.ethereum) {
      console.error('multiple wallets installed')
    } else {
      this.registerHandlers()
    }
  }

  async addNetwork() {
    if (!this.provider || !this.currentNetwork) {
      return
    }
    this.provider
    .request({
      method: 'wallet_addEthereumChain',
      params: [this.currentNetwork]
    })
    .catch((error: any) => {
      console.log(error)
    })
  }

  async getAccounts() {
    if (!this.provider) {
      return
    }

    console.log('getting accounts')
    const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      this.setCurrentAccount(accounts[0])
    } else {
      let accounts = await this.enableEthereum()
      if (accounts.length > 0) {
        this.setCurrentAccount(accounts[0])
      } else {
        this.setCurrentAccount(null)
      }
    }
    this.signer =this.provider.getSigner()
    console.log('signer is now ', this.signer)
    return accounts
  }

  async enableEthereum(): Promise<any> {
    return await this.provider.enable()
  }

  private async registerHandlers() {
    this.provider.on('connect', this.handleAccountConnected.bind(this))
    this.provider.on('disconnect', this.handleAccountDisconnected.bind(this))
    this.provider.on('chainChanged', this.handledChainChanged.bind(this))
    this.provider.on('accountsChanged', this.handleAccountChanged.bind(this))
  }

  private handleAccountConnected(accounts) {
    console.log('>>> Account connected: ', accounts)
  }

  private handleAccountDisconnected(accounts) {
    console.log('>>> Account disconnected: ', accounts)
  }

  private handledChainChanged(chainId) {
    console.log('>>> Chain changed to: ', chainId)
    this.networkSubject.next(chainId)
  }

  private handleAccountChanged(accounts) {
    console.log('this is ', this)
    if (accounts.length > 0) {
      this.setCurrentAccount(accounts[0])
    } else {
      this.setCurrentAccount(null)
    }
    console.log('>>> Account changed to: ', accounts)
  }

  private setCurrentAccount(account: string | null) {
    this.currentAccount = account
    this.accountSubject.next(account)
  }

  private initializeNetworkConnection() {
    let eth: any = window.ethereum
    if (eth) {
      console.log('current network version is: ', eth.networkVersion)
    }
    let currentNetwork: NetworkParams = environment.config.networkParams
    if (currentNetwork && currentNetwork.chainId) {
      this.handledChainChanged(currentNetwork.chainId)
    }
    this.currentNetwork = currentNetwork
    this.currentConfig = environment.config
  }

  onboard() {}
}
