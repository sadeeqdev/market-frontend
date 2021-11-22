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
  ethereum
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
      let ethereum = await detectEthereumProvider();
      if (ethereum) {
        await this.startApp(ethereum)
        return ethereum != undefined
      }
    } catch (error) {
      console.error('unable to detect ethereum provider: ', error)
    }
  }

  async startApp(ethereum: any) {
    this.provider = new ethers.providers.Web3Provider(ethereum, 'any')
    this.signer = await this.provider.getSigner()
    console.log('Signer = ', this.signer)
    this.registerHandlers()
    if (ethereum.selectedAddress) {
      ethereum.enable()
      this.setCurrentAccount(ethereum.selectedAddress)
      console.log('selected address is ', ethereum.selectedAddress)
    } else {
    }
    // if (provider !== window.ethereum) {
    //   console.error('multiple wallets installed')
    // } else {
    //   let trySigner = await eth.getSigner()
    //   console.log('trySigner = ', trySigner)
    // }
  }

  async addNetwork() {
    if (!this.provider || !this.currentNetwork) {
      return
    }
    console.log('about to add: ', this.currentNetwork)
    this.provider
    .send(
      'wallet_addEthereumChain',
      [this.currentNetwork]
    )
    .catch((error: any) => {
      console.log(error)
    })
  }

  async getAccounts() {
    if (!this.provider) {
      return
    }

    console.log('getting accounts')
    const accounts = await this.provider.send('eth_requestAccounts', []);
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
    this.signer = this.provider.getSigner()
    console.log('signer is now ', this.signer)
    return accounts
  }

  async enableEthereum(): Promise<any> {
    return await this.provider.enable()
  }

  private async registerHandlers() {
    console.log('registering handlers')
    this.provider.on('connect', this.handleAccountConnected.bind(this))
    this.provider.on('disconnect', this.handleAccountDisconnected.bind(this))
    this.provider.on('network', this.handledChainChanged.bind(this))
    this.provider.on('accountsChanged', this.handleAccountChanged.bind(this))
  }

  private handleAccountConnected(accounts) {
    console.log('>>> Account connected: ', accounts)
  }

  private handleAccountDisconnected(accounts) {
    console.log('>>> Account disconnected: ', accounts)
  }

  private handledChainChanged(network) {
    console.log('>>> Chain changed to: ', network)
    this.networkSubject.next(this.getHexString(network.chainId))
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
      let hexVersion = this.getHexString(eth.networkVersion)
      console.log('current network version is: ', hexVersion)
      this.handledChainChanged(hexVersion)
    } else [
      console.log('no ethereum')
    ]
    let currentNetwork: NetworkParams = environment.config.networkParams
    if (currentNetwork && currentNetwork.chainId) {
    }
    this.currentNetwork = currentNetwork
    this.currentConfig = environment.config
  }

  private getHexString(networkCode) {
    return `0x${(+networkCode).toString(16)}`
  }

  currencyName(): string {
    return environment.config.networkParams.nativeCurrency.symbol
  }

  onboard() {}
}
