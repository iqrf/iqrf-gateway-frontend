import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tracer-file',
  templateUrl: './tracer-file.component.html',
  styleUrls: ['./tracer-file.component.css'],
  providers: [MessageService]
})
export class TracerFileComponent implements OnInit {

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
    this.apiMsg.GetConfigComponent('shape::TraceFileService');

    this.cols = [
      { field: 'instance', header: 'Name of instance', width: '30%', align: 'left' },
      { field: 'path', header: 'Path to directory with logs', width: '30%', align: 'left' },
      { field: 'filename', header: 'File name', width: '30%', align: 'left'  },
      { field: 'actions', header: '', width: '10%', align: 'center'  }
    ];
  }


  Update(w: apiHttp.ConfigComponentResponse100) {
    // this.cfg = _.cloneDeep(w);
    this.configName = w.configuration.name;

  }

  Saved(w: any) {
    console.log('feedback....');
    if (w === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Configuration has been saved.'});
      this.apiMsg.GetConfigComponent('shape::TraceFileService');

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
      component: 'shape::TraceFileService',
      instance: 'My New TraceFileService instance',
      path: '',
      filename: '',
      timestampFiles: false,
      VerbosityLevels: [
        {
          channel: 0,
          level: 'INF'
        }
      ]
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

  OnAddVerbLevel() {
    this.instance.VerbosityLevels.push({
      channel: 0,
      level: 'INF'
    });

  }

  OnRemoveVerbLevel(i) {
    console.log('i: ' + i);
    const vl: any [] = [];

    let idx = 0;
    for (const l of this.instance.VerbosityLevels) {
      if (idx !== i) {
        vl.push(l);
      }

      idx ++;
    }

    this.instance.VerbosityLevels = vl;

  }

}
