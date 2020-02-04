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
  public boAddress: number;
  public boIndex: number;
  public boState = false;

  // IQRF Light
  public lgAddress: number;
  public lgIndex: number;
  public lgPower: number;

  // IQRF Sensor
  public snsAddress: number;

  // IQRF DALI
  public daliAddress: number;
  public daliCommands: number [] = [];

  constructor(public wsMsg: WsMsgsService, public messageService: MessageService, private confirmationService: ConfirmationService) {
    this.daliCommands.push(1);
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
         this.messageService.add({
           severity: 'error',
           summary: 'Error [' + data.data.status + ']',
           detail: data.data.statusStr
         });
       }
     } else if (msg.mType === 'iqrfBinaryoutput_SetOutput') {

       const data = msg as api.IqrfBinaryoutputSetOutputResponse100;

       if (data.data.status !== 0) {
         this.messageService.add({
           severity: 'error',
           summary: 'Error [' + data.data.status + ']',
           detail: data.data.statusStr
         });
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

  OnAddCommand() {
    this.daliCommands.push(1);
  }

  OnRemoveCommand() {
    this.daliCommands.pop();
  }

}
