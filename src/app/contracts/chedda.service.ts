import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheddaService {
  cheddaContract: any

  constructor() {
   }
}
