import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-mqtt-interface',
  templateUrl: './mqtt-interface.component.html',
  styleUrls: ['./mqtt-interface.component.css'],
  providers: [MessageService]
})
export class MqttInterfaceComponent implements OnInit {

  configName = '';
  instanceName = '';
  public cfg: apiHttp.ConfigComponentResponse100 = null;
  public instance: any = null;

  cols: any[];

  // Dialog
  displayDlg = false;
  titleDlg = '';
  operDialog: 'add' | 'edit';


  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorApiUpdated$.subscribe(w => { this.Update(w); });
    this.apiMsg.emitorApiSaved$.subscribe(w => { this.Saved(w); });
   }

  ngOnInit() {
    this.apiMsg.GetConfigComponent('iqrf::MqttMessaging');

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

  Update(w: apiHttp.ConfigComponentResponse100) {
    this.cfg = _.cloneDeep(w);
    this.configName = this.cfg.configuration.name;

    if (this.cfg.instances.length > 0) {
      this.instanceName = this.cfg.instances[0].instance;
    }
  }

  OnSave() {
    this.apiMsg.PutConfigComponentInstance(this.configName, this.instanceName, this.cfg.instances[0]);

  }

  Saved(w: any) {
    console.log('feedback....');
    if (w === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Configuration has been saved.'});

    } else {
      this.msg.add({severity: 'error', summary: 'Error', detail: 'Configuration saving failed.'});
    }
  }

  OnEdit(event: any, data: any) {
    this.instance = data;

    this.titleDlg = 'Edit instance';
    this.operDialog = 'edit';
    this.displayDlg = true;

  }

  OnRemove(event: any, data: any) {

  }

  OnAdd() {
    /*
    this.instance = {
      id: 0,
      component: '',
      instance: '',
      BrokerAddr: '',
      ClientId: '',
      Persistence: '',
      Qos: 0,
      TopicRequest: '',
      TopicResponse: '',
      User: '',
      Password: '',
      EnabledSSL: false,
      KeepAliveInterval: 0,
      ConnectTimeout: 0,
      MinReconnect: 0,
      MaxReconnect: 0,
      TrustStore: '',
      KeyStore: '',
      PrivateKey: '',
      PrivateKeyPassword: '',
      EnabledCipherSuites: '',
      EnableServerCertAuth: false,
      acceptAsyncMsg: false
    };

    this.titleDlg = 'Add instance';
    this.operDialog = 'add';
    this.displayDlg = true;
    */
  }

  OnDialogOK() {
    if (this.operDialog === 'edit') {
      this.OnSave();
    } else {

    }

  }

}
