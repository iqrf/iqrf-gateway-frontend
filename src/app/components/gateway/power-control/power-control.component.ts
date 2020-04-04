import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-power-control',
  templateUrl: './power-control.component.html',
  styleUrls: ['./power-control.component.css'],
  providers: [MessageService]
})
export class PowerControlComponent implements OnInit {

  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorPowerOff$.subscribe(w => { this.StatusPowerOff(w); });
    this.apiMsg.emitorReboot$.subscribe(w => { this.StatusReboot(w); });
   }

  ngOnInit() {
  }

  OnPowerOff() {
    Swal.fire({
      title: 'Power Off?',
      text: 'Do you want to power the gateway off?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiMsg.PostGatewayPowerOff();
      }
    });

  }

  OnReboot() {
    Swal.fire({
      title: 'Reboot?',
      text: 'Do you want to reboot the gateway?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiMsg.PostGatewayReboot();
      }
    });

  }

  StatusPowerOff(data: any) {
    console.log('feedback....');
    if (data === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Gateway has been powered off.'});

    } else {
      this.msg.add({severity: 'error', summary: 'Error', detail: 'Power off command failed.'});
    }
  }

  StatusReboot(data: any) {
    console.log('feedback....');
    if (data === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Gateway is rebooting.'});

    } else {
      this.msg.add({severity: 'error', summary: 'Error', detail: 'Reboot command failed.'});
    }
  }

}
