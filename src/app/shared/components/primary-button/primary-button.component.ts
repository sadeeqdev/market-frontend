import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {
  @Input() buttonText: string;
  @Input() visibility: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.clicked.emit();
  }
}