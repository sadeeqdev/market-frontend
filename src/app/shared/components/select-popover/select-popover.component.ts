import { Component, HostListener, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-popover',
  templateUrl: './select-popover.component.html',
  styleUrls: ['./select-popover.component.scss'],
})
export class SelectPopoverComponent implements OnInit {

  @Input() collaterals: string[];
  @Input() selectedCollateral: string;
  @Output() changed = new EventEmitter<string>();
  isOpenSelectMenu: boolean;

  constructor(
  ) { }

  async ngOnInit() {}

  openSelectMenu(){
    this.isOpenSelectMenu = !this.isOpenSelectMenu
  }

  handleCollateralSelect(value: string) {
    console.log('from component', value)
    this.changed.emit(value);
    this.isOpenSelectMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.isOpenSelectMenu = false;
    }
  } 

}
