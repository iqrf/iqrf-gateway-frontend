import { Component, OnInit } from '@angular/core';
import { WsMsgsService } from '../../../services/ws-msgs.service'

@Component({
  selector: 'app-cfg-general',
  templateUrl: './cfg-general.component.html',
  styleUrls: ['./cfg-general.component.css']
})
export class CfgGeneralComponent implements OnInit {

  public channel: 'mqtt'|'ws' = 'ws';

  constructor(public wsMsg: WsMsgsService) { }

  ngOnInit() {
    this.channel = this.wsMsg.channel;
  }

  OnSelected(e) {    
    this.wsMsg.channel = this.channel;

  }

}
