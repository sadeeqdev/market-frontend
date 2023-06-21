import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss'],
})
export class ActionModalComponent implements OnInit {
  @Input() heading: string;
  @Input() message: string;
  @Input() actionText: string;
  @Input() modalAction: () => void;
  @Input() cancelAction: () => void;

  constructor() { }

  ngOnInit() {}

}
