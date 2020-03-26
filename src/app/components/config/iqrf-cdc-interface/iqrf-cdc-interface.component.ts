import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-iqrf-cdc-interface',
  templateUrl: './iqrf-cdc-interface.component.html',
  styleUrls: ['./iqrf-cdc-interface.component.css']
})
export class IqrfCdcInterfaceComponent implements OnInit {

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::IqrfCdc');
  }

}
