import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-websocket-interface',
  templateUrl: './websocket-interface.component.html',
  styleUrls: ['./websocket-interface.component.css']
})
export class WebsocketInterfaceComponent implements OnInit {

  cols: any[];

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.GetConfigComponent('iqrf::WebsocketMessaging');

    this.cols = [
      { field: 'instance', header: 'Name of instance' },
      { field: 'wsport', header: 'WebSocket port' },
      { field: 'acceptAsyncMsg', header: 'Accept asynchronous messages' },
      { field: 'acceprLocalhost', header: 'Accept only connection from localhost' },
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
