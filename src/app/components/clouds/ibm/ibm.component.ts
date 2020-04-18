import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import {MessageService} from 'primeng/api';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-ibm',
  templateUrl: './ibm.component.html',
  styleUrls: ['./ibm.component.css'],
  providers: [MessageService]
})
export class IbmComponent implements OnInit {

  orgid = '';
  devtype = '';
  devid = '';
  token = '';
  cmdid = '';

  constructor(public apiMsg: HttpMsgsService, public msg: MessageService) {
    this.apiMsg.emitorApiSaved$.subscribe(w => { this.Saved(w); });
   }

  ngOnInit() {
  }

  Saved(w: any) {
    console.log('feedback....');
    if (w === null) {
      this.msg.add({severity: 'success', summary: 'Success', detail: 'Cloud has been saved.'});

    } else {
      this.msg.add({severity: 'error', summary: 'Error', detail: 'Cloud saving failed.'});
    }
  }

  OnSave() {
    const msg = {
      organizationId: this.orgid,
      deviceType: this.devtype,
      token: this.token,
      eventId: this.cmdid
    };

    this.apiMsg.PostCloudManager('/clouds/ibmCloud', msg);
  }

  OnPdfGuide() {
    window.open('https://github.com/iqrfsdk/iot-starter-kit/blob/master/install/pdf/iqrf-part3c.pdf');

  }


  OnVideoGuide() {
    window.open('https://www.youtube.com/watch?v=xoAReOyrkZ4&feature=youtu.be');

  }

}
