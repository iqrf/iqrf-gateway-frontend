import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';


@Component({
  selector: 'app-udp-interface',
  templateUrl: './udp-interface.component.html',
  styleUrls: ['./udp-interface.component.css']
})
export class UdpInterfaceComponent implements OnInit {

  cols: any[];

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::UdpMessaging');

    this.cols = [
      { field: 'instance', header: 'Name of instance' },
      { field: 'RemotePort', header: 'Remote port' },
      { field: 'LocalPort', header: 'Local port' },
      { field: 'actions', header: '' }
    ];
  }

  OnEdit(event: any, data: any) {

  }

  OnRemove(event: any, data: any) {

  }

  OnAdd() {

  }

}
