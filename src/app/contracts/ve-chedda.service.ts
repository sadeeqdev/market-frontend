import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import VeChedda from '../../artifacts/VEToken.json'
import { BehaviorSubject } from 'rxjs';
import { EnvironmentProviderService } from '../providers/environment-provider.service';

@Injectable({
  providedIn: 'root'
})
export class VeCheddaService {

  veContract
  withdrawSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  depositSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  
  constructor(private provider: DefaultProviderService, private wallet: WalletProviderService, private environmentService: EnvironmentProviderService, private http: HttpClient) {
    this.initializeVeContract();
    this.listenToEvents();
    this.registerForEvents();
  }

  private initializeVeContract() {
    const veCheddaAddress = this.wallet.currentConfig.contracts.veChedda;
    const veCheddaAbi = VeChedda.abi;
    const providerd = this.provider.provider;
  
    this.veContract = new ethers.Contract(veCheddaAddress, veCheddaAbi, providerd);
  }

  listenToEvents(){
    this.environmentService.getEvent().subscribe((network) => {
      if (network) {
        this.initializeVeContract();
        this.registerForEvents();
      }
    });
  }

  address(): string {
    return this.wallet.currentConfig.contracts.veChedda
  }

  async lockedEnd(address: string): Promise<BigNumber> {
    return await this.veContract.lockedEnd(address)  
  }

  async lockedAmount(address: string) {
    return await this.veContract.lockedAmount(address)  
  }

  async balanceOf(address: string) {
    return await this.veContract["balanceOf(address)"](address)  
  }

  async balanceOfAtTime(address: string, time: BigNumber) {
    return await this.veContract.balanceOf(address, time) 
  }

  async balanceOfAtBlock(address: string, block: BigNumber) {
    return await this.veContract.balanceOfAt(address, block) 
  }

  async totalSupply(): Promise<BigNumber> {
    return await this.veContract["totalSupply()"]
  }

  async createLock(amount: BigNumber, unlockTime: BigNumber): Promise<BigNumber> {
    return await this.veContract.connect(this.wallet.signer).createLock(amount, unlockTime)
  }

  async withdraw() {
    await this.veContract.connect(this.wallet.signer).withdraw()
  }

  registerForEvents() {
    this.veContract.on('Deposit', (address, amount, time) => {
      this.depositSubject.next({
        address,
        amount,
        time
      })
    })

    this.veContract.on('Withdraw', (address, amount, time) => {
      console.log('Withdraw event: ', address, amount, time)
      this.withdrawSubject.next({
        address,
        amount,
        time
      })
    })
  }
}
