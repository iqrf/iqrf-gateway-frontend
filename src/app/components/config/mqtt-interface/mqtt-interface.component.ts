import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-mqtt-interface',
  templateUrl: './mqtt-interface.component.html',
  styleUrls: ['./mqtt-interface.component.css']
})
export class MqttInterfaceComponent implements OnInit {

  cols: any[];

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::MqttMessaging');

    this.cols = [
      { field: 'instance', header: 'Name of instance' },
      { field: 'BrokerAddr', header: 'Broker address' },
      { field: 'ClientId', header: 'Client ID' },
      { field: 'TopicRequest', header: 'Topic of request' },
      { field: 'TopicResponse', header: 'Topic of response' },
      { field: 'EnabledSSL', header: 'Enabled TLS' },
      { field: 'acceptAsyncMsg', header: 'Asynchronous messages' },
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
