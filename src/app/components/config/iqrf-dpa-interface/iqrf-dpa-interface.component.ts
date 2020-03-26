import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-iqrf-dpa-interface',
  templateUrl: './iqrf-dpa-interface.component.html',
  styleUrls: ['./iqrf-dpa-interface.component.css']
})
export class IqrfDpaInterfaceComponent implements OnInit {

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::IqrfDpa');
  }

}
