import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-monitoring-services',
  templateUrl: './monitoring-services.component.html',
  styleUrls: ['./monitoring-services.component.css'],
  providers: [MessageService]
})
export class MonitoringServicesComponent implements OnInit {

  cols: any[];

  configName = '';
  configNameCpp = '';
  instanceName = '';
  instanceNameCpp = '';
  public instance: any = null;
  public instanceCpp: any = null; //paired websocket service...

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
    this.apiMsg.GetConfigComponent('shape::WebsocketCppService');

    this.cols = [
      { field: 'reportPeriod', header: 'Reporting period in seconds' },
      { field: 'wsport', header: 'WebSocket server port' },
      { field: 'acceptLocalhost', header: 'Accept only connection from localhost' },
      { field: 'actions', header: '' }
    ];
  }

  Update(w: apiHttp.ConfigComponentResponse100) {
    if (w.configuration.name === 'iqrf::MonitorService') {
      this.configName = w.configuration.name;

    } else if (w.configuration.name === 'shape::WebsocketCppService') {
      this.configNameCpp = w.configuration.name;
    }
  }

  Saved(w: any) {
    console.log('feedback....');
    if (w === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Configuration has been saved.'});
      this.apiMsg.GetConfigComponent('iqrf::MonitorService');
      this.apiMsg.GetConfigComponent('shape::WebsocketCppService');

    } else {
      this.msg.add({severity: 'error', summary: 'Error', detail: 'Configuration saving failed.'});
    }
  }

  OnEdit(event: any, data: any) {
    this.instance = data;
    this.instanceName = this.instance.instance;

    this.instanceCpp = this.GetWsCppInstance(this.instance);
    this.instanceNameCpp = this.instanceCpp.instance;

    if (this.instanceCpp === null || this.instanceNameCpp === null) {
      return;
    }

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

        const instanceCpp = this.GetWsCppInstance(data);

        if (instanceCpp !== null) {
          this.apiMsg.DeleteConfigComponentInstance(this.configNameCpp, instanceCpp.instance);
        }
        this.apiMsg.DeleteConfigComponentInstance(this.configName, data.instance);
      }
    });

  }

  OnAdd() {

    const tst = Math.round((new Date()).getTime() / 1000);

    this.instanceName = 'MonitorService' + tst.toString();
    this.instanceNameCpp = 'WebsocketCppService_MonitorService' +  tst.toString();

    this.instance = {
      id: 0,
      component: 'iqrf::MonitorService',
      instance: this.instanceName,
      reportPeriod: 55,
      RequiredInterfaces: [
        {
          name: 'shape::IWebsocketService',
          target: {
            instance: this.instanceNameCpp
          }
        }
      ]
    };

    this.instanceCpp = {
      id: 2,
      component: 'shape::WebsocketCppService',
      instance: this.instanceNameCpp,
      WebsocketPort: 111,
      acceptOnlyLocalhost: false
    };

    this.titleDlg = 'Add instance';
    this.operDialog = 'add';
    this.displayDlg = true;

  }

  OnDialogOK() {
    if (this.operDialog === 'edit') {
      this.apiMsg.PutConfigComponentInstance(this.configNameCpp, this.instanceNameCpp, this.instanceCpp);
      this.apiMsg.PutConfigComponentInstance(this.configName, this.instanceName, this.instance);
    } else {
      this.apiMsg.PostConfigComponent(this.configNameCpp, this.instanceCpp);
      this.apiMsg.PostConfigComponent(this.configName, this.instance);
    }

  }

  GetWsCppInstance(WsMsgInstance: any): any {
    if (WsMsgInstance.RequiredInterfaces.length > 0) {
      const name = WsMsgInstance.RequiredInterfaces[0].target.instance;
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
