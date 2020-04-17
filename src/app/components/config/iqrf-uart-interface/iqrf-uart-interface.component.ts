import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-iqrf-uart-interface',
  templateUrl: './iqrf-uart-interface.component.html',
  styleUrls: ['./iqrf-uart-interface.component.css'],
  providers: [MessageService]
})
export class IqrfUartInterfaceComponent implements OnInit {

  configName = '';
  instanceName = '';
  public cfg: apiHttp.ConfigComponentResponse100 = null;

  public baudRates: SelectItem [];
  public selBaudRate = '57600';

  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorApiUpdated$.subscribe(w => { this.Update(w); });
    this.apiMsg.emitorApiSaved$.subscribe(w => { this.Saved(w); });

    this.baudRates = [
      {label: '1200 Bd', value: 1200},
      {label: '2400 Bd', value: 2400},
      {label: '4800 Bd', value: 4800},
      {label: '19200 Bd', value: 19200},
      {label: '38400 Bd', value: 38400},
      {label: '57600 Bd', value: 57600},
      {label: '115200 Bd', value: 115200},
      {label: '230400 Bd', value: 230400}
    ];

   }

  ngOnInit() {
    this.apiMsg.GetConfigComponent('iqrf::IqrfUart');
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

  OnRaspi1Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyAMA0';
    this.cfg.instances[0].powerEnableGpioPin = 23;
    this.cfg.instances[0].busEnableGpioPin = 7;
  }

  OnRaspiCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS0';
    this.cfg.instances[0].powerEnableGpioPin = 23;
    this.cfg.instances[0].busEnableGpioPin = 7;
  }

  OnOrangeCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS0';
    this.cfg.instances[0].powerEnableGpioPin = 19;
    this.cfg.instances[0].busEnableGpioPin = 10;
  }

  OnUnipiCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS0';
    this.cfg.instances[0].powerEnableGpioPin = 18;
    this.cfg.instances[0].busEnableGpioPin = -1;
  }

  OnUpCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS1';
    this.cfg.instances[0].powerEnableGpioPin = 23;
    this.cfg.instances[0].busEnableGpioPin = 7;
  }

  OnUp2Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS1';
    this.cfg.instances[0].powerEnableGpioPin = 23;
    this.cfg.instances[0].busEnableGpioPin = 7;
  }

  OnItfS0Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS0';
  }

  OnItfS1Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS1';
  }

  OnItfS2Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS2';
  }

  OnItfS3Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS3';
  }

  OnItfS4Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS4';
  }

  OnItfS5Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS5';
  }

  OnItfS6Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS6';
  }

  OnItfS7Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/ttyS7';
  }

}
