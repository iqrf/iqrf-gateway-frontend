import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqttService } from './services/mqtt.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    MqttService
  ]
})
export class MqttModule { }
