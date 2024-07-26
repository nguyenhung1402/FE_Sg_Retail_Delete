import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sniper',
  templateUrl: './sniper.component.html',
  styleUrls: ['./sniper.component.scss'],
})
export class SniperComponent implements OnInit {
  @Input() Loading: boolean = true;
  constructor() { }

  ngOnInit() {}

}
