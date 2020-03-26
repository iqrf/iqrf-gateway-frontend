import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-iqrf-spi-interface',
  templateUrl: './iqrf-spi-interface.component.html',
  styleUrls: ['./iqrf-spi-interface.component.css']
})
export class IqrfSpiInterfaceComponent implements OnInit {

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::IqrfSpi');
  }

}
