import { Injectable } from '@angular/core';
import { Dapp } from './dapps/dapp.model';
import dapplist from './dapps/dapplist.json';

@Injectable({
  providedIn: 'root'
})
export class DappService {

  dapps: any[];

  constructor() {
    this.loadDapps();
   }

  loadDapps() {
    this.dapps = dapplist;
    return this.dapps;
  }
}
