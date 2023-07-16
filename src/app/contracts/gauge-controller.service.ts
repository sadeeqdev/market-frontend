import { Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { DefaultProviderService } from '../providers/default-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import GaugeController from '../../artifacts/GaugeController.json'
import { BehaviorSubject } from 'rxjs';
import { EnvironmentProviderService } from '../providers/environment-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GaugeControllerService {

  gaugeControllerContract
  votedSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  rebalanceSubject: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(
    private provider: DefaultProviderService,
    private wallet: WalletProviderService,
    private environmentService: EnvironmentProviderService,
  ) {
    this.initializeGaugeControllerContract();
    this.listenToEvents();
    this.registerForEvents();
  }

  private initializeGaugeControllerContract() {
    const gaugeControllerAddress = this.wallet.currentConfig.contracts.GaugeController;
    const gaugeControllerAbi = GaugeController.abi;
    const provider = this.provider.provider;
  
    this.gaugeControllerContract = new ethers.Contract(
      gaugeControllerAddress,
      gaugeControllerAbi,
      provider
    );
  }
    
  listenToEvents(){
    this.environmentService.getEvent().subscribe((network) => {
      if (network) {
        this.initializeGaugeControllerContract();
        this.registerForEvents();
      }
    });
  }

  async vote(gaugeAddress: string) {
    await this.gaugeControllerContract.connect(this.wallet.signer).vote(gaugeAddress)
  }

  async gaugeVotes(gaugeAddress: string): Promise<BigNumber> {
    return await this.gaugeControllerContract.gaugeVotes(gaugeAddress)
  }

  async allGaugeVotes(): Promise<any> {
    return await this.gaugeControllerContract.allGaugeVotes()
  }

  async currentEpoch() {
    return await this.gaugeControllerContract.currentEpoch()
  }

  async rebalance(address: string) {
    return await this.gaugeControllerContract.connect(this.wallet.signer).rebalance(address)
  }

  registerForEvents() {
    this.gaugeControllerContract.on('Voted', (account, gauge, votes) => {
      console.log('Voted: ', account, gauge, votes)
      this.votedSubject?.next({
        account,
        gauge,
        votes
      })
    })
    // this.gaugeControllerContract.on('Rebalance', (res) => {
    //   console.log('rebalance: ', res)
    //   this.rebalanceSubject?.next({
    //     res
    //   })
    // })
  }
}
