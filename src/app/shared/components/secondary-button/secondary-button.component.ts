import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
})
export class SecondaryButtonComponent implements OnInit {
  @Input() buttonText: string;
  @Input() visibility: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.clicked.emit();
  }
}