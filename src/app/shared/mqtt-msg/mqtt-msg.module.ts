import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqttMsgService } from './services/mqtt-msg.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    MqttMsgService
  ]
})
export class MqttMsgModule { }
