import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(public apiMsg: HttpMsgsService) {

   }

  ngOnInit() {
    this.apiMsg.GetGatewayInfo();
  }

  GetIpAddress(): string [] {
    if (this.apiMsg.gwInfo === null) {
      return [];
    }
    for (const itf of this.apiMsg.gwInfo.interfaces) {
      if (itf.ipAddresses !== null) {
        return itf.ipAddresses;
      }
    }
    return [];
  }

  GetPerc(strNum: string, strNumAll: string): number {
    const num = parseFloat(strNum);
    const numAll = parseFloat(strNumAll);

    const perc = num * 100 / numAll;

    return _.round(perc, 1);

  }


}
