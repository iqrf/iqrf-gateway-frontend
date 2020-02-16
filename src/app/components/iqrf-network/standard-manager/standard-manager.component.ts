import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WsMsgsService } from '../../../services/ws-msgs.service';
import * as api from '../../../api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-standard-manager',
  templateUrl: './standard-manager.component.html',
  styleUrls: ['./standard-manager.component.css'],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class StandardManagerComponent implements OnInit {

  // IQRF Binary output
  public boAddress: number = 1;
  public boIndex: number;
  public boState = false;

  // IQRF Light
  public lgAddress: number = 1;
  public lgIndex: number;
  public lgPower: number;

  // IQRF Sensor
  public snsAddress: number;

  // IQRF DALI
  public daliAddress: number;
  public daliCommands: number [] = [];

  constructor(public wsMsg: WsMsgsService, public messageService: MessageService, private confirmationService: ConfirmationService) {
    //this.daliCommands.push(1);
    // Incomming message
    wsMsg.emitorStdMgr$.subscribe( w => { this.IncommingMessage(w); });
  }

  ngOnInit() {
  }

  IncommingMessage(msg: any) {
    console.log('--IncommingMessage--');
    console.log(JSON.stringify(msg, null, 1));

    try {
     if (msg.mType === 'iqrfBinaryoutput_Enumerate') {

       const data = msg as api.IqrfBinaryoutputEnumerateResponse100;

       if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

     } else if (msg.mType === 'iqrfBinaryoutput_SetOutput') {

       const data = msg as api.IqrfBinaryoutputSetOutputResponse100;

       if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

     } else if (msg.mType === 'iqrfLight_Enumerate') {

      const data = msg as api.IqrfLightEnumerateResponse100;

      if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfLight_SetPower') {

      const data = msg as api.IqrfLightSetPowerResponse100;

      if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfLight_IncrementPower') {

      const data = msg as api.IqrfLightIncrementPowerResponse100;

      if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfLight_DecrementPower') {

      const data = msg as api.IqrfLightDecrementPowerResponse100;

      if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfSensor_Enumerate') {

      const data = msg as api.IqrfSensorEnumerateResponse100;

      if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfSensor_ReadSensorsWithTypes') {

      const data = msg as api.IqrfSensorReadSensorsWithTypesResponse100;

      if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfDali_SendCommands') {

      const data = msg as api.IqrfDaliSendCommandsResponse100;

      if (data.data.status !== 0) {
        this.ErrorMsg(data.data.status, data.data.statusStr);
      }

    } else {

       this.messageService.add({
         severity: 'warning',
         summary: 'Unknown message!',
         detail: 'Nodes gone...'
       });

      }

    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Incomming message error!',
        detail: msg.mType
      });

      return;
    }
  }

  ErrorMsg(status: number, statusStr: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error [' + status + ']',
      detail: statusStr
    });
  }

  OnAddCommand() {
    this.daliCommands.push(1);
  }

  OnRemoveCommand() {
    this.daliCommands.pop();
  }

  OnBoEnumerate() {
    this.wsMsg.msg_iqrfBinaryoutput_Enumerate(this.wsMsg.idStdMgr, this.boAddress);
  }

  OnBoGetState() {
    // TBD ???
  }

  OnBoSetState() {
    this.wsMsg.msg_iqrfBinaryoutput_SetOutput(this.wsMsg.idStdMgr, this.boAddress, [{index: this.boIndex, state: this.boState}]);
  }

  OnLightEnumerate() {
    this.wsMsg.msg_iqrfLight_Enumerate(this.wsMsg.idStdMgr, this.lgAddress);

  }

  OnLightGetPower() {
    this.wsMsg.msg_iqrfLight_SetPower(this.wsMsg.idStdMgr, this.lgAddress, [{index: this.lgIndex, power: this.lgPower}]);

  }

  OnLightSetPower() {
    this.wsMsg.msg_iqrfLight_SetPower(this.wsMsg.idStdMgr, this.lgAddress, [{index: this.lgIndex, power: this.lgPower}]);
  }

  OnLightIncrementPower() {
    this.wsMsg.msg_iqrfLight_IncrementPower(this.wsMsg.idStdMgr, this.lgAddress, [{index: this.lgIndex, power: this.lgPower}]);
  }

  OnLightDecrementPower() {
    this.wsMsg.msg_iqrfLight_DecrementPower(this.wsMsg.idStdMgr, this.lgAddress, [{index: this.lgIndex, power: this.lgPower}]);

  }

  OnSensorEnumerate() {
    this.wsMsg.msg_iqrfSensor_Enumerate(this.wsMsg.idStdMgr, this.snsAddress);

  }

  OnSensorReadAll() {
    this.wsMsg.msg_iqrfSensor_ReadSensorsWithTypes(this.wsMsg.idStdMgr, this.snsAddress, [0, 1]);

  }

  OnDaliSendCommands() {
    this.wsMsg.msg_iqrfDali_SendCommands(this.wsMsg.idStdMgr, this.daliAddress, this.daliCommands);

  }

}
