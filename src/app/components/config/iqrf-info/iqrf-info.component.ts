import { Component, OnInit } from '@angular/core';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';


@Component({
  selector: 'app-iqrf-info',
  templateUrl: './iqrf-info.component.html',
  styleUrls: ['./iqrf-info.component.css']
})
export class IqrfInfoComponent implements OnInit {

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::IqrfInfo');
  }

}
