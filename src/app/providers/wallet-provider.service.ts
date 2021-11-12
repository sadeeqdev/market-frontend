import { Injectable } from '@angular/core';
import { ethers, providers, Signer,  } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider';
import { BehaviorSubject } from 'rxjs';

export const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
}

export const POLYGON_TESTNET_PARAMS = {
  chainId: '80001',
  chainName: 'Polygon Mumbai Testnet',
  nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
}

@Injectable({
  providedIn: 'root'
})
export class WalletProviderService {

  
  provider: any
  web3
  signer: Signer

  currentAccount
  currentNetwork
  isConnected: boolean = false
  connectedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
  accountSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  networkSubject: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() { }

  async isConected(): Promise<boolean> {
    try {
      this.provider = await detectEthereumProvider();
      this.startApp(this.provider)
    } catch (error) {
      console.error('unable to detect ethereum provider: ', error)
    }

    return this.provider && await this.provider.isConnected();
  }

  async startApp(provider: any) {
    if (provider !== window.ethereum) {
      console.error('multiple wallets installed')
    } else {
      this.registerHandlers()
    }
  }


  async addNetwork() {
    if (!this.provider) {
      return
    }
    this.provider
    .request({
      method: 'wallet_addEthereumChain',
      params: [AVALANCHE_TESTNET_PARAMS]
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
      this.currentAccount = accounts[0]
      this.accountSubject.next(this.currentAccount)
    } else {
      let accounts = await this.enableEthereum()
      if (accounts.length > 0) {
        this.currentAccount = accounts[0]
        this.accountSubject.next(this.currentAccount)
      }
    }
    return accounts
  }
  async enableEthereum(): Promise<any> {
    return await this.provider.enable()
  }

  private async registerHandlers() {
    this.provider.on('connect', this.handleAccountConnected)
    this.provider.on('disconnect', this.handleAccountDisconnected)
    this.provider.on('chainChanged', this.handledChainChanged)
    this.provider.on('accountsChanged', this.handleAccountChanged)
  }

  private handleAccountConnected(accounts) {
    console.log('account connected: ', accounts)
  }

  private handleAccountDisconnected(accounts) {
    console.log('account disconnected: ', accounts)
  }

  private handledChainChanged(chainId) {
    console.log('chain changed to: ', chainId)
  }

  private handleAccountChanged(accounts) {
    console.log('account changed to: ', accounts)
  }


  // async openMetamask() {
  //   this.window.web3 = new Web3(this.window.ethereum);
  //   let addresses = await this.getAccounts();
  //   console.log("service",addresses)
  //   if (!addresses.length) {
  //       try {
  //           addresses = await this.window.ethereum.enable();
  //       } catch (e) {
  //           return false;
  //       }
  //   }
  // }

  // private async enableMetaMaskAccount(): Promise<any> {
  //   let enable = false;
  //   await new Promise((resolve, reject) => {
  //     enable = window.ethereum.enable();
  //   });
  //   return Promise.resolve(enable);
  // }

  onboard() {}
}
