import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';


@Component({
  selector: 'app-iqrf-uart-interface',
  templateUrl: './iqrf-uart-interface.component.html',
  styleUrls: ['./iqrf-uart-interface.component.css']
})
export class IqrfUartInterfaceComponent implements OnInit {

  public baudRates: SelectItem [];
  public selBaudRate = '57600';

  constructor(public apiMsg: HttpMsgsService) {
    this.baudRates = [
      {label: '1200 Bd', value: 1200},
      {label: '2400 Bd', value: 2400},
      {label: '4800 Bd', value: 4800},
      {label: '19200 Bd', value: 19200},
      {label: '38400 Bd', value: 38400},
      {label: '57600 Bd', value: 57600},
      {label: '115200 Bd', value: 115200},
      {label: '230400 Bd', value: 230400}
    ];

   }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::IqrfUart');
  }

}
