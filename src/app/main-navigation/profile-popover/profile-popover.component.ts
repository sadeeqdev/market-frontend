import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {
  @Input() address: string
  @Input() cheddaBalance: string
  @Input() xCheddaBalance: string
  isOpenProfileMenu: boolean;
  addressCopyText: string = 'Copy';

  constructor(
    private router: Router,
    private wallet: WalletProviderService,
  ) { }

  async ngOnInit() {}


  copyAddress() {
    navigator.clipboard.writeText(this.address).then(() => {
      this.addressCopyText = 'Copied!';
      setTimeout(() => {
        this.addressCopyText = 'Copy';
      }, 2000)
    }).catch(e => console.log(e));
  }

  async navigateToProfile() {
    this.router.navigate(['/', 'profile', this.address])
  }

  async disconnect() {
    await this.wallet.disconnect()
  }

  openProfileMenu(){
    this.isOpenProfileMenu = !this.isOpenProfileMenu
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.isOpenProfileMenu = false;
    }
  } 
}
