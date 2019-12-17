import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WsService } from './services/ws.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    WsService
  ]
})
export class WsModule { }
