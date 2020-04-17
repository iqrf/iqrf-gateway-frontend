import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-udp-interface',
  templateUrl: './udp-interface.component.html',
  styleUrls: ['./udp-interface.component.css'],
  providers: [MessageService]
})
export class UdpInterfaceComponent implements OnInit {

  cols: any[];

  configName = '';
  instanceName = '';
  public instance: any = null;

  // Dialog
  displayDlg = false;
  titleDlg = '';
  operDialog: 'add' | 'edit';

  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorApiUpdated$.subscribe(w => { this.Update(w); });
    this.apiMsg.emitorApiSaved$.subscribe(w => { this.Saved(w); });
  }

  ngOnInit() {
    this.apiMsg.GetConfigComponent('iqrf::UdpMessaging');

    this.cols = [
      { field: 'instance', header: 'Name of instance' },
      { field: 'RemotePort', header: 'Remote port' },
      { field: 'LocalPort', header: 'Local port' },
      { field: 'actions', header: '' }
    ];
  }


  Update(w: apiHttp.ConfigComponentResponse100) {
    this.configName = w.configuration.name;
  }

  Saved(w: any) {
    console.log('feedback....');
    if (w === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Configuration has been saved.'});

    } else {
      this.msg.add({severity: 'error', summary: 'Error', detail: 'Configuration saving failed.'});
      this.apiMsg.GetConfigComponent('iqrf::UdpMessaging');
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
      component: 'iqrf::UdpMessaging',
      instance: 'UdpMessaging',
      RemotePort: 0,
      LocalPort: 0,
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

}
