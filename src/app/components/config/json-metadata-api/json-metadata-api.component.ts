import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-json-metadata-api',
  templateUrl: './json-metadata-api.component.html',
  styleUrls: ['./json-metadata-api.component.css']
})
export class JsonMetadataApiComponent implements OnInit {

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.configComponent('iqrf::JsonMngMetaDataApi');
  }

}
