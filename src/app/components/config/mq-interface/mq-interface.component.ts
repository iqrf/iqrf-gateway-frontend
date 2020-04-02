import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-mq-interface',
  templateUrl: './mq-interface.component.html',
  styleUrls: ['./mq-interface.component.css']
})
export class MqInterfaceComponent implements OnInit {

  cols: any[];

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::MqMessaging');

    this.cols = [
      { field: 'instance', header: 'Name of instance' },
      { field: 'LocalMqName', header: 'Local MQ name' },
      { field: 'RemoteMqName', header: 'Remote MQ name' },
      { field: 'acceptAsyncMsg', header: 'Accept Async messages' },
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
