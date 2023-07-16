import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonService } from '../../button.service';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {
  @Input() buttonText: string;
  @Input() visibility: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor(
    private buttonService: ButtonService,
  ) {}

  ngOnInit() {}

  async onClick() {
    this.buttonService.handleTransactionButton(this.clicked.emit())
  }
}
