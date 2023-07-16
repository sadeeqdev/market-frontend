import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonService } from '../../button.service';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
})
export class SecondaryButtonComponent implements OnInit {
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