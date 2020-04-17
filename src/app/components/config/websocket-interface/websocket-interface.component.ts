import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-websocket-interface',
  templateUrl: './websocket-interface.component.html',
  styleUrls: ['./websocket-interface.component.css'],
  providers: [MessageService]
})
export class WebsocketInterfaceComponent implements OnInit {

  cols: any[];

  configName = '';
  instanceName = '';
  configWsCppName = ''
  public instance: any = null;

  public wsCppService: any; //paired websocket service...

  // Dialog
  displayDlg = false;
  titleDlg = '';
  operDialog: 'add' | 'edit';

  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorApiUpdated$.subscribe(w => { this.Update(w); });
    this.apiMsg.emitorApiSaved$.subscribe(w => { this.Saved(w); });
   }

  ngOnInit() {
    this.apiMsg.GetConfigComponent('iqrf::WebsocketMessaging');
    this.apiMsg.GetConfigComponent('shape::WebsocketCppService');

    this.cols = [
      { field: 'instance', header: 'Name of instance' },
      { field: 'wsport', header: 'WebSocket port' },
      { field: 'acceptAsyncMsg', header: 'Accept asynchronous messages' },
      { field: 'acceptLocalhost', header: 'Accept only connection from localhost' },
      { field: 'actions', header: '' }
    ];
  }


  Update(w: apiHttp.ConfigComponentResponse100) {
    // this.cfg = _.cloneDeep(w);
    if (w.configuration.name === 'iqrf::WebsocketMessaging') {
      this.configName = w.configuration.name;

    } else if (w.configuration.name === 'shape::WebsocketCppService') {
      this.configWsCppName = w.configuration.name;
    }
/*
    if ((this.configName !== '' && this.configWsCppName !== '')) {
      // Find WsCpp instance...
      for (const ws of this.apiMsg.configWsCpp.instances) {
        //if ()
      }

    }
    */
  }

  Saved(w: any) {
    console.log('feedback....');
    if (w === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Configuration has been saved.'});
      this.apiMsg.GetConfigComponent('iqrf::WebsocketMessaging');
      this.apiMsg.GetConfigComponent('shape::WebsocketCppService');

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
      component: 'iqrf::MqMessaging',
      instance: 'My New MQ instance',
      LocalMqName: '',
      RemoteMqName: '',
      acceptAsyncMsg: false
    };

    this.titleDlg = 'Add instance';
    this.operDialog = 'add';
    this.displayDlg = true;

  }

  OnDialogOK() {
    if (this.operDialog === 'edit') {
      this.apiMsg.PutConfigComponentInstance(this.configName, this.instanceName, this.instance);
    } else {
      this.apiMsg.PostConfigComponent(this.configName, this.instance);
    }

  }

  GetWsCppInstance(WsMsgInstance: any): any {
    if (WsMsgInstance.RequiredInterfaces.length > 0) {
      const name = WsMsgInstance.RequiredInterfaces[0].target.instance;

      console.log('------> ' + name);

      for (const wsCpp of this.apiMsg.configWsCpp.instances) {
        if (wsCpp.instance === name) {
          return wsCpp;
        }

      }
    }

    return null;
  }

  GetWsPort(instance): number {
    if (instance.RequiredInterfaces.length > 0) {
      const wsCppInstance = this.GetWsCppInstance(instance);
      if (wsCppInstance === null) {
        return -1;
      }
      return wsCppInstance.WebsocketPort;
    }
    return -1;

  }

  GetAcceptLocHost(instance): boolean {
    if (instance.RequiredInterfaces.length > 0) {
      const wsCppInstance = this.GetWsCppInstance(instance);
      if (wsCppInstance === null) {
        return false;
      }
      return wsCppInstance.acceptOnlyLocalhost;
    }
    return false;

  }  

}
