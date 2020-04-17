import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-iqrf-spi-interface',
  templateUrl: './iqrf-spi-interface.component.html',
  styleUrls: ['./iqrf-spi-interface.component.css'],
  providers: [MessageService]
})
export class IqrfSpiInterfaceComponent implements OnInit {

  configName = '';
  instanceName = '';
  public cfg: apiHttp.ConfigComponentResponse100 = null;

  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorApiUpdated$.subscribe(w => { this.Update(w); });
    this.apiMsg.emitorApiSaved$.subscribe(w => { this.Saved(w); });
  }

  ngOnInit() {
    this.apiMsg.GetConfigComponent('iqrf::IqrfSpi');
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

  OnRaspiCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/spidev0.0';
    this.cfg.instances[0].powerEnableGpioPin = 23;
    this.cfg.instances[0].busEnableGpioPin = 7;
    this.cfg.instances[0].pgmSwitchGpioPin = 22;
  }

  OnOrangeCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/spidev1.0';
    this.cfg.instances[0].powerEnableGpioPin = 19;
    this.cfg.instances[0].busEnableGpioPin = 10;
    this.cfg.instances[0].pgmSwitchGpioPin = 3;
  }

  OnUnipiCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/spidev0.3';
    this.cfg.instances[0].powerEnableGpioPin = 2;
    this.cfg.instances[0].busEnableGpioPin = 18;
    this.cfg.instances[0].pgmSwitchGpioPin = 19;
  }

  OnUpCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/spidev2.0';
    this.cfg.instances[0].powerEnableGpioPin = 23;
    this.cfg.instances[0].busEnableGpioPin = 7;
    this.cfg.instances[0].pgmSwitchGpioPin = 22;
  }

  OnUp2Cfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/spidev1.0';
    this.cfg.instances[0].powerEnableGpioPin = 23;
    this.cfg.instances[0].busEnableGpioPin = 7;
    this.cfg.instances[0].pgmSwitchGpioPin = 22;
  }

  OnInterfacesCfg() {
    this.cfg.instances[0].IqrfInterface = '/dev/spidev1.0';
  }

}
