import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() heading: string;
  @Input() message: string;
  @Input() txLink: string;
  @Input() closeModal: () => void;

  constructor() { }

  ngOnInit() {}

}
