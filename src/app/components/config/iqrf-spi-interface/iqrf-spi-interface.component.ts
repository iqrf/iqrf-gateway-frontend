import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iqrf-spi-interface',
  templateUrl: './iqrf-spi-interface.component.html',
  styleUrls: ['./iqrf-spi-interface.component.css']
})
export class IqrfSpiInterfaceComponent implements OnInit {

  public enableSpiReset: boolean;

  constructor() { }

  ngOnInit() {
  }

}
