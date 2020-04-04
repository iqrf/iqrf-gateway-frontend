import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';


@Component({
  selector: 'app-monitoring-services',
  templateUrl: './monitoring-services.component.html',
  styleUrls: ['./monitoring-services.component.css'],
  providers: [MessageService]
})
export class MonitoringServicesComponent implements OnInit {

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
    this.apiMsg.GetConfigComponent('iqrf::MonitorService');

    this.cols = [
      { field: 'reportPeriod', header: 'Reporting period in seconds' },
      { field: 'BrokerAddr', header: 'WebSocket server port	' },
      { field: 'ClientId', header: 'Accept only connection from localhost' },
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
