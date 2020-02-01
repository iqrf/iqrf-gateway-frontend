import { Directive, ElementRef, Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { WsMsgsService } from '../../../services/ws-msgs.service';
import * as api from '../../../api';
import 'prismjs/components/prism-json.js';

interface SubMenu {
  text: string;
  dpa: string;
}

declare var Prism: any;


@Component({
  selector: 'app-send-dpa-packet',
  templateUrl: './send-dpa-packet.component.html',
  styleUrls: ['./send-dpa-packet.component.css'],
  providers: [MessageService]
})
export class SendDpaPacketComponent implements OnInit {

  public msgReq: string;
  public msgResp: string;
  public msgRespCode: string;
  public msgReqCode: string;
  msg: 'none' | 'waiting' | 'done' = 'none';

  public ownNadr = false;
  public ownDpaTimeout = false;
  public dpaPacket: string;
  public custNadr: string;
  public dpaTimeout: number;

  items: MenuItem[];

  itemsCoord: SubMenu[] = [
    {text: 'DPA params: normal', dpa: '00.00.00.08.ff.ff.00'},
    {text: 'DPA params: testing', dpa: '00.00.00.08.ff.ff.0c'},
    {text: 'Set hops', dpa: '00.00.00.09.ff.ff.ff.ff'},
    {text: 'Run discovery', dpa: '00.00.00.07.ff.ff.07.00'},
    {text: 'Clear all bonds', dpa: '00.00.00.03.ff.ff'},
    {text: 'Re-bond Node', dpa: '00.00.00.06.ff.ff.01'},
    {text: 'Remove bonded Node', dpa: '00.00.00.05.ff.ff.01'},
    {text: 'Bond new Node', dpa: '00.00.00.04.ff.ff.00.00'},
    {text: 'Authorize bond', dpa: '00.00.00.0d.ff.ff.00.00.00.00.00'},
    {text: 'Getdiscovered Nodes', dpa: '00.00.00.01.ff.ff'},
    {text: 'Get bonded Nodes', dpa: '00.00.00.02.ff.ff'},
    {text: 'Get number of Nodes', dpa: '00.00.00.00.ff.ff'}
  ];

  itemsNode: SubMenu[] = [
    {text: 'Clear prebonded MID', dpa: '01.00.01.03.ff.ff'},
    {text: 'Read prebonded MID', dpa: '01.00.01.02.ff.ff'},
    {text: 'Enable prebonding', dpa: '01.00.01.04.ff.ff.07.01.00.00.00.00'},
    {text: 'Remove bond', dpa: '01.00.01.01.ff.ff'},
    {text: 'Read NTW info', dpa: '01.00.01.00.ff.ff'}
  ];

  itemsOs: SubMenu[] = [
    {text: 'Get information for more peripherals', dpa: '00.00.ff.00.ff.ff'},
    {text: 'Get peripheral information', dpa: '00.00.00.3f.ff.ff'},
    {text: 'Peripheral enumeration', dpa: '00.00.ff.3f.ff.ff'},
    {text: 'Read HWP configuration', dpa: '01.00.02.02.ff.ff'},
    {text: 'Sleep', dpa: '01.00.02.04.ff.ff.00.00.00'},
    {text: 'Run RFPGM', dpa: '00.00.02.03.ff.ff'},
    {text: 'Reset', dpa: '00.00.02.01.ff.ff'},
    {text: 'Read info', dpa: '00.00.02.00.ff.ff'}
  ];

  itemsMem: SubMenu[] = [
    {text: 'RAM write', dpa: '00.00.05.01.ff.ff.00.01.02.03.04.05'},
    {text: 'RAM read', dpa: '00.00.05.00.ff.ff.00.05'},
    {text: 'EEEPROM write', dpa: '00.00.04.03.ff.ff.00.00.00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f'},
    {text: 'EEEPROM read', dpa: '00.00.04.02.ff.ff.00.00.10'},
    {text: 'EEPROM write', dpa: '00.00.03.01.ff.ff.00.01.02.03.04.05'},
    {text: 'EEPROM read', dpa: '00.00.03.00.ff.ff.00.05'}
  ];

  itemsLed: SubMenu[] = [
    {text: 'Set LEDR on', dpa: '00.00.06.01.ff.ff'},
    {text: 'Set LEDG on', dpa: '00.00.07.01.ff.ff'},
    {text: 'Pulse LEDR', dpa: '00.00.06.03.ff.ff'},
    {text: 'Set LEDR off', dpa: '00.00.06.00.ff.ff'},
    {text: 'Set LEDG off', dpa: '00.00.07.00.ff.ff'},
    {text: 'Pulse LEDG', dpa: '00.00.07.03.ff.ff'},
    {text: 'LEDR flashing', dpa: '00.00.06.04.ff.ff'},
    {text: 'LEDG flashing', dpa: '00.00.07.04.ff.ff'},
  ];

  constructor(public wsMsg: WsMsgsService, public messageService: MessageService) {

    wsMsg.emitorDpa$.subscribe( w => { this.IncommingMessage(w); });

    this.items = [];

    // Coordinator
    const coord: MenuItem = {
      label: 'Coordinator',
      visible: true,
      items: []
    };

    this.items.push(coord);

    const coordSub: MenuItem [] = [];
    coord.items = coordSub;

    for (const sm of this.itemsCoord) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };
      coordSub.push(it);
    }

    // Node
    const node: MenuItem = {
      label: 'Noode',
      visible: true,
      items: []
    };

    this.items.push(node);

    const nodeSub: MenuItem [] = [];
    node.items = nodeSub;

    for (const sm of this.itemsNode) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      nodeSub.push(it);
    }

    // Os
    const osNode: MenuItem = {
      label: 'OS, Peripheral info',
      visible: true,
      items: []
    };

    this.items.push(osNode);

    const osNodeSub: MenuItem [] = [];
    osNode.items = osNodeSub;

    for (const sm of this.itemsOs) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      osNodeSub.push(it);
    }

    // Memories
    const memNode: MenuItem = {
      label: 'Memories',
      visible: true,
      items: []
    };

    this.items.push(memNode);

    const memNodeSub: MenuItem [] = [];
    memNode.items = memNodeSub;

    for (const sm of this.itemsMem) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      memNodeSub.push(it);
    }

    // LED
    const ledNode: MenuItem = {
      label: 'LED',
      visible: true,
      items: []
    };

    this.items.push(ledNode);

    const ledNodeSub: MenuItem [] = [];
    ledNode.items = ledNodeSub;

    for (const sm of this.itemsLed) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      ledNodeSub.push(it);
    }


   }

  ngOnInit() {
    this.msg = 'none';
  //  Prism.highlightElement(this.el.nativeElement);
  }

  OnTest(sm: SubMenu) {
    this.dpaPacket = sm.dpa;
  }

  IncommingMessage(msg: any) {
    console.log('--IncommingMessage--');
    console.log(JSON.stringify(msg, null, 1));

    try {
      if (msg.mType === 'iqrfRaw') {

        const data = msg as api.IqrfRawResponse100;

        this.msgResp = JSON.stringify(msg, null, 1);

        this.msgRespCode = Prism.highlight(this.msgResp, Prism.languages.json);

        this.msg = 'done';

        if (data.data.status === 0) {
          /*
          this.OnBondedDevices();
          this.OnDiscoveredDevices();
          */

        } else {
        //  this.MessageError(data.data.status, data.data.statusStr);

        }

      } else {

        this.messageService.add({
          severity: 'warning',
          summary: 'Unknown message!',
          detail: 'Nodes gone...'
        });
      }

    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Incomming message error!',
        detail: msg.mType
      });
      return;
    }
  }

  MessageBack(msg: any) {
    console.log(msg);
    this.msgResp = JSON.stringify(msg, null, 1);
    this.msg = 'done';
  }

  OnSend() {
    const json = {
      mType: 'iqrfRaw',
      data: {
          req: {
              rData: this.dpaPacket
          },
          returnVerbose: true,
          msgId: '...'
      }
    };

    if (!this.CheckDpaFormat(this.dpaPacket)) {
      console.log('ERROR [SendJsonRequestComponent]: Wrong Dpa syntax :(');

      this.messageService.add({severity: 'error', summary: 'DPA error!', detail: 'Wrong DPA syntax, please check it!!!'});
      return;

    }

    if (this.ownNadr) {
      if (this.custNadr === undefined) {
        this.custNadr = '0';
      }
      const adr = parseInt(this.custNadr, 10);
      const str = adr.toString(16);

      let ss = this.dpaPacket;
      ss = ss.slice(2);

      if (str.length <= 1) {
        json.data.req.rData = '0' + str + ss;
      }
    }

    if (this.ownDpaTimeout) {
      if (this.dpaTimeout === undefined || this.dpaTimeout === null) {
        this.dpaTimeout = 0;
      }

      json.data["timeout"] = this.dpaTimeout;

    }

    // Save message
    this.msgReq = JSON.stringify(json, null, 1);
    this.msgReqCode = Prism.highlight(this.msgReq, Prism.languages.json);

    this.msg = 'waiting';
    //const ret = this.wsMsg.sendMessageConfirm(json, this.wsMsg.emitorDpa$);
    const ret = this.wsMsg.msg_any(this.wsMsg.idSendDpa, json);

    if (!ret) {

      this.messageService.add({
        severity: 'error',
        summary: 'Message contains errors!',
        detail: 'Please check if message parameters are correct.'
      });
      this.msg = 'none';
    }
  }

  public CheckDpaFormat(rData: string): boolean {
    if (rData === undefined) {
      return false;
    }

    return true;

  }
}
