import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-iqrf-dpa-interface',
  templateUrl: './iqrf-dpa-interface.component.html',
  styleUrls: ['./iqrf-dpa-interface.component.css'],
  providers: [MessageService]
})
export class IqrfDpaInterfaceComponent implements OnInit {

  configName = '';
  instanceName = '';
  public cfg: apiHttp.ConfigComponentResponse100 = null;

  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorApiUpdated$.subscribe(w => { this.Update(w); });
    this.apiMsg.emitorApiSaved$.subscribe(w => { this.Saved(w); });
   }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::IqrfDpa');
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

}
