import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-iqrf-uart-interface',
  templateUrl: './iqrf-uart-interface.component.html',
  styleUrls: ['./iqrf-uart-interface.component.css']
})
export class IqrfUartInterfaceComponent implements OnInit {

  public baudRates: SelectItem [];
  public selBaudRate: string = '57600 Bd';    

  constructor() {
    this.baudRates = [
      {label:'1200 Bd', value: '1200 Bd'},
      {label:'2400 Bd', value: '2400 Bd'},
      {label:'4800 Bd', value: '4800 Bd'},
      {label:'19200 Bd', value: '19200 Bd'},
      {label:'38400 Bd', value: '38400 Bd'},
      {label:'57600 Bd', value: '57600 Bd'},
      {label:'115200 Bd', value: '115200 Bd'},
      {label:'230400 Bd', value: '230400 Bd'}
    ]; 

   }

  ngOnInit() {
  }

}
