import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { HttpMsgsService } from '../../../services/http-msgs.service';
import * as apiHttp from '../../../api_http';
import * as _ from 'lodash';

@Component({
  selector: 'app-tracer-file',
  templateUrl: './tracer-file.component.html',
  styleUrls: ['./tracer-file.component.css']
})
export class TracerFileComponent implements OnInit {

  cols: any[];

  constructor(public apiMsg: HttpMsgsService) { }

  ngOnInit() {
    this.apiMsg.GetConfigComponent('shape::TraceFileService');

    this.cols = [
      { field: 'instance', header: 'Name of instance', width: '30%', align: 'left' },
      { field: 'path', header: 'Path to directory with logs', width: '30%', align: 'left' },
      { field: 'filename', header: 'File name', width: '30%', align: 'left'  },
      { field: 'actions', header: '', width: '10%', align: 'center'  }
    ];
  }

  OnEdit(event: any, data: any) {

  }

  OnRemove(event: any, data: any) {

  }

  OnAdd() {

  }

}
