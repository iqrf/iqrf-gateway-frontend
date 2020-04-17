import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

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
  }

  Saved(w: any) {
    console.log('feedback....');
    if (w === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Configuration has been saved.'});
      this.apiMsg.GetConfigComponent('iqrf::MqttMessaging');

    } else {
      this.msg.add({severity: 'error', summary: 'Error', detail: 'Configuration saving failed.'});
    }
  }

  OnEdit(event: any, data: any) {
    this.instance = data;
    this.instanceName = this.instance.instance;


    this.titleDlg = 'Edit instance';
    this.operDialog = 'edit';
    this.displayDlg = true;

  }

  OnRemove(event: any, data: any) {
    Swal.fire({
      title: 'Remove?',
      text: 'Do you want to remove instance \'' + data.instance + '\'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove instance',
      confirmButtonColor: 'var(--confirm-button)',
      cancelButtonColor: 'var(--cancel-button)',
      customClass: {
        header: 'confirm-dlg-header',
        title: 'confirm-dlg-title',
        content: 'confirm-dlg-content'
      }

    }).then((result) => {
      if (result.value) {
        this.apiMsg.DeleteConfigComponentInstance(this.configName, data.instance);
      }
    });

    
  }

  OnAdd() {

    this.instance = {
      id: 0,
      component: 'iqrf::MqttMessaging',
      instance: '',
      BrokerAddr: '',
      ClientId: '',
      Persistence: 1,
      Qos: 1,
      TopicRequest: '',
      TopicResponse: '',
      User: '',
      Password: '',
      EnabledSSL: false,
      KeepAliveInterval: 20,
      ConnectTimeout: 5,
      MinReconnect: 1,
      MaxReconnect: 64,
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

  }

  OnDialogOK() {
    if (this.operDialog === 'edit') {
      //this.OnSave();
      this.apiMsg.PutConfigComponentInstance(this.configName, this.instanceName, this.instance);
    } else {
      this.apiMsg.PostConfigComponent(this.configName, this.instance);
    }

  }

}
