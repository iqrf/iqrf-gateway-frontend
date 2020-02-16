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

  itemsIoPins: SubMenu[] = [
    {text: 'Set all pins: OUTs', dpa: '01.00.09.00.ff.ff.00.21.00.01.10.00.02.fc.00'},
    {text: 'Set all pins: LOW', dpa: '01.00.09.01.ff.ff.00.21.00.01.10.00.02.fc.00'},
    {text: 'Set all pins: HIGH', dpa: '01.00.09.01.ff.ff.00.21.21.01.10.10.02.fc.fc'},
    {text: 'Set all pins: INs', dpa: '01.00.09.00.ff.ff.00.21.21.01.10.10.02.fc.fc'},
    {text: 'Set pin C1: LOW', dpa: '01.00.09.01.ff.ff.00.01.00'},
    {text: 'Set pin C1: HIGH', dpa: '01.00.09.01.ff.ff.00.01.01'},
    {text: 'Pulse 1s on C1 pin', dpa: '01.00.09.01.ff.ff.00.01.01.ff.e8.03.00.01.00'},
    {text: 'Get pins state', dpa: '01.00.09.02.ff.ff'},
    {text: 'Play DDC-IO-01', dpa: '01.00.09.01.ff.ff.02.04.04.ff.96.00.00.01.01.ff.96.00.00.20.20.01.10.10.' +
    '02.40.40.ff.96.00.02.08.08.ff.96.00.02.10.10.ff.96.00.02.a0.a0.ff.e8.03.00.21.00.01.10.00.02.fc.00'},
    {text: 'DDC-RE-01: RE1 pulse 1s', dpa: '01.00.09.01.ff.ff.02.04.04.ff.e8.03.02.04.00'},
    {text: 'DDC-RE-01: RE2 pulse 1s', dpa: '01.00.09.01.ff.ff.02.a0.a0.ff.e8.03.02.a0.00'}
  ];

  itemsTemp: SubMenu[] = [
    {text: 'Get temperature', dpa: '01.00.0a.00.ff.ff'},
    {text: 'Open UART: 9600', dpa: '01.00.0c.00.ff.ff.03'},
    {text: 'Close UART', dpa: '01.00.0c.01.ff.ff'},
    {text: 'Write UART', dpa: '01.00.0c.02.ff.ff.ff.48.65.6c.6c.6f'},
    {text: 'Write/read UART', dpa: '01.00.0c.02.ff.ff.0a.48.65.6c.6c.6f'},
    {text: 'Write SPI', dpa: '01.00.08.00.ff.ff.ff.48.65.6c.6c.6f'},
    {text: 'Write/read SPI', dpa: '01.00.08.00.ff.ff.0a.48.65.6c.6c.6f'}
  ];

  itemsFrc: SubMenu[] = [
    {text: '2b: Prebonding', dpa: '00.00.0d.00.ff.ff.00.00.00'},
    {text: '2b: Acknowledged bradcast', dpa: '00.00.0d.00.ff.ff.02.05.06.03.ff.ff'},
    {text: 'Selective LEDR on', dpa: '00.00.0d.02.ff.ff.02.3e.00.00.00.00.00.00.00.00.00.00.' +
    '00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.05.06.01.ff.ff'},
    {text: 'Extra result', dpa: '00.00.0d.01.ff.ff'},
    {text: '2b: UART/SPI data', dpa: '00.00.0d.00.ff.ff.01.00.00'},
    {text: 'Selective LEDR off', dpa: '00.00.0d.02.ff.ff.02.3e.00.00.00.00.00.00.00.00.00.00.' +
    '00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.05.06.00.ff.ff'},
    {text: 'Set FRC response time 2560 ms', dpa: '00.00.0d.03.ff.ff.40'},
    {text: '1B: Temperature', dpa: '00.00.0d.00.ff.ff.80.00.00'},
    {text: '1B: Acknowledge broadcast', dpa: '00.00.0d.00.ff.ff.81.05.06.03.ff.ff'}
  ];


  itemsLed: SubMenu[] = [
    {text: 'Set LEDR on', dpa: '00.00.06.01.ff.ff'},
    {text: 'Set LEDG on', dpa: '00.00.07.01.ff.ff'},
    {text: 'Pulse LEDR', dpa: '00.00.06.03.ff.ff'},
    {text: 'Set LEDR off', dpa: '00.00.06.00.ff.ff'},
    {text: 'Set LEDG off', dpa: '00.00.07.00.ff.ff'},
    {text: 'Pulse LEDG', dpa: '00.00.07.03.ff.ff'},
    {text: 'LEDR flashing', dpa: '00.00.06.04.ff.ff'},
    {text: 'LEDG flashing', dpa: '00.00.07.04.ff.ff'}
  ];

  itemsIot: SubMenu[] = [
    {text: 'SE-all-data', dpa: '01.00.5e.01.ff.ff.ff.ff.ff.ff'},
    {text: 'FRC-temperature 2B', dpa: '00.00.0d.00.ff.ff.e0.5e.01.00.00'},
    {text: 'FRC-photoresistor', dpa: '00.00.0d.00.ff.ff.90.5e.81.00.00'},
    {text: 'FRC-potentiometr', dpa: '00.00.0d.00.ff.ff.90.5e.81.01.00'},
    {text: 'RE1-off, RE2-off', dpa: '02.00.4b.00.ff.ff.03.00.00.00.00.00'},
    {text: 'RE1-on, RE2-on', dpa: '02.00.4b.00.ff.ff.03.00.00.00.01.01'},
    {text: 'RE1-on, RE2-off', dpa: '02.00.4b.00.ff.ff.03.00.00.00.01.00'},
    {text: 'RE1-off, RE2-on', dpa: '02.00.4b.00.ff.ff.03.00.00.00.00.01'},
    {text: 'RE1-on', dpa: '02.00.4b.00.ff.ff.01.00.00.00.01'},
    {text: 'RE1-off', dpa: '02.00.4b.00.ff.ff.01.00.00.00.00'},
    {text: 'RE1-on 1s', dpa: '02.00.4b.00.ff.ff.01.00.00.00.81'},
    {text: 'RE2-on 2s', dpa: '02.00.4b.00.ff.ff.02.00.00.00.82'}
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

    // I/O pins
    const ioNode: MenuItem = {
      label: 'I/O pins',
      visible: true,
      items: []
    };

    this.items.push(ioNode);

    const ioNodeSub: MenuItem [] = [];
    ioNode.items = ioNodeSub;

    for (const sm of this.itemsIoPins) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      ioNodeSub.push(it);
    }

    // Temp, UART, SPI
    const tempNode: MenuItem = {
      label: 'Temp, UART, SPI',
      visible: true,
      items: []
    };

    this.items.push(tempNode);

    const tempNodeSub: MenuItem [] = [];
    tempNode.items = tempNodeSub;

    for (const sm of this.itemsTemp) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      tempNodeSub.push(it);
    }

    // FRC
    const frcNode: MenuItem = {
      label: 'FRC',
      visible: true,
      items: []
    };

    this.items.push(frcNode);

    const frcNodeSub: MenuItem [] = [];
    frcNode.items = frcNodeSub;

    for (const sm of this.itemsFrc) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      frcNodeSub.push(it);
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

    // IoT Starter Kit
    const iotNode: MenuItem = {
      label: 'IoT Starter Kit',
      visible: true,
      items: []
    };

    this.items.push(iotNode);

    const iotNodeSub: MenuItem [] = [];
    iotNode.items = iotNodeSub;

    for (const sm of this.itemsLed) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      };

      iotNodeSub.push(it);
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
