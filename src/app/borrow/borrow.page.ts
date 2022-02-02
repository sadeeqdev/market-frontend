import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheddaLoanManagerService, LoanRequestStatus, LoanStatus } from '../contracts/chedda-loan-manager.service';
import { CheddaXpService } from '../contracts/chedda-xp.service';
import { MarketExplorerService } from '../contracts/market-explorer.service';
import { WalletProviderService } from '../providers/wallet-provider.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.page.html',
  styleUrls: ['./borrow.page.scss'],
})
export class BorrowPage implements OnInit {

  ngOnInit(): void {
    
  }

}
