import { Component, Input, OnInit } from '@angular/core';
import { Drop } from '../../drop.model';

@Component({
  selector: 'app-drop-card',
  templateUrl: './drop-card.component.html',
  styleUrls: ['./drop-card.component.scss'],
})
export class DropCardComponent implements OnInit {

  @Input('drop')drop: Drop
  constructor() { }

  ngOnInit() {}

}
