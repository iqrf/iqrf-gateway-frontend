import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {SelectItem} from 'primeng/api';
import Konva from 'konva';
import { MessageService } from 'primeng/api';
import { WsMsgsService } from '../../../services/ws-msgs.service';
import * as api from '../../../api';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-network-manager',
  templateUrl: './network-manager.component.html',
  styleUrls: ['./network-manager.component.css'],
  providers: [MessageService]
})
export class NetworkManagerComponent implements OnInit {

  @ViewChild('container', {static: true})
  elem: ElementRef<HTMLDivElement>;

  public bondMethod: SelectItem [];
  public selBondMethod = 'local';
  public bondAddress = 1;
  public bondAutoAddr = false;
  public bondTestRetries = 1;
  public bondUnbondCoordOnly = false;
  public bondSmartConnectCode: string;

  public discTxPower = 6;
  public discMaxNdAddr = 239;

  progSpinner: 'none' | 'discovery' | 'bonding' = 'none';

  // Graphics
  public stage: Konva.Stage;
  layer: Konva.Layer;

  gcolorGwBorder;
  gcolorGwFill;
  gcolorNodeSlot;
  gcolorNodeBonded;
  gcolorNodeDiscovered;

  public bondedAddr: number [] = [];
  public discoveredAddr: number [] = [];

  constructor(public wsMsg: WsMsgsService, public messageService: MessageService) {

    wsMsg.emitorNtwMgr$.subscribe( w => { this.MessageBack(w); });

    this.bondMethod = [
      {label: 'Local bonding', value: 'local'},
      {label: 'Smart Connect', value: 'smart'}
    ];
   }

  ngOnInit() {

    this.InitColors();

    this.stage = new Konva.Stage({
      container: this.elem.nativeElement,
      width: 600,
      height: 340,
      preventDefault: false
    });

    this.layer = new Konva.Layer(
      {
        preventDefault: false
      }
    );
    this.stage.add(this.layer);

    this.DrawMap();

    // Send init messages...

    this.OnBondedDevices();
    this.OnDiscoveredDevices();

  }

  InitColors() {
    this.gcolorGwBorder = window.getComputedStyle(document.documentElement).getPropertyValue('--gcolor-gw-border');
    this.gcolorGwFill = window.getComputedStyle(document.documentElement).getPropertyValue('--gcolor-gw-fill');
    this.gcolorNodeSlot = window.getComputedStyle(document.documentElement).getPropertyValue('--gcolor-node-slot');
    this.gcolorNodeBonded = window.getComputedStyle(document.documentElement).getPropertyValue('--gcolor-node-bonded');
    this.gcolorNodeDiscovered = window.getComputedStyle(document.documentElement).getPropertyValue('--gcolor-node-discovered');
  }

  OnSendMessage(json: any) {
    const ret = this.wsMsg.sendMessage(json);

    if (ret) {
    //  this.msg = 'waiting';

    } else {
      this.progSpinner = 'none';

      this.messageService.add({
        severity: 'error',
        summary: 'Message service werror!',
        detail: 'Message error'
      });
    }
  }

  OnSendReturn(ret: boolean) {
    if (ret) {
    //  this.msg = 'waiting';

    } else {
      this.progSpinner = 'none';

      this.messageService.add({
        severity: 'error',
        summary: 'Message service werror!',
        detail: 'Message error'
      });
    }
  }

  OnDiscovery() {
    this.progSpinner = 'discovery';
    const ret = this.wsMsg.msg_iqrfEmbedCoordinatorDiscovery(this.discTxPower, this.discMaxNdAddr);
    this.OnSendReturn(ret);

  }

  OnDiscoveredDevices() {
    const ret = this.wsMsg.msg_iqrfEmbedCoordinator_DiscoveredDevices();
    this.OnSendReturn(ret);

  }

  OnBondedDevices() {
    const ret = this.wsMsg.msg_iqrfEmbedCoordinator_BondedDevices();
    this.OnSendReturn(ret);
  }

  OnClearAllBonds() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Clear all bonds?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--main-color)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upload it!'
    }).then((result) => {
      if (result.value) {
        if (this.bondUnbondCoordOnly) {
          const ret = this.wsMsg.msg_iqrfEmbedCoordinator_ClearAllBonds();
          this.OnSendReturn(ret);
        } else {
          //const ret = this.wsMsg.msg_iqrfEmbedCoordinator_RemoveBond(this.bondedAddr);
         // this.OnSendReturn(ret);
        }
      }
    });
  }

  OnUnbondNode() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Unbond node with address ' + this.bondAddress,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--main-color)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upload it!'
    }).then((result) => {
      if (result.value) {

          const ret = this.wsMsg.msg_iqrfEmbedCoordinator_RemoveBond(this.bondAddress);
          this.OnSendReturn(ret);

      }
    });
  }

  OnBondNode() {
    this.progSpinner = 'bonding';
    let nAdr = 0;
    if (this.bondAutoAddr) {
      nAdr = this.bondAddress;
    }
    const ret = this.wsMsg.msg_iqrfEmbedCoordinator_BondNode(nAdr);
    this.OnSendReturn(ret);
  }

  MessageBack(msg: any) {
    console.log('--msg back--');
    console.log(JSON.stringify(msg, null, 1));

    if (msg.mType === 'iqrfEmbedCoordinator_Discovery') {
      this.progSpinner = 'none';

      const data = msg as api.IqrfEmbedCoordinatorDiscoveryResponse100;

      if (data.data.status === 0) {
        this.OnDiscoveredDevices();

      } else {
        this.MessageError(data.data.status, data.data.statusStr);

      }

    } else if (msg.mType === 'iqrfEmbedCoordinator_DiscoveredDevices') {
      this.progSpinner = 'none';

      const data = msg as api.IqrfEmbedCoordinatorDiscoveredDevicesResponse100;

      if (data.data.status === 0) {
        if ('rsp' in data.data) {
          if ('result' in data.data.rsp) {
            if ('discoveredDevices' in data.data.rsp.result) {
              this.discoveredAddr = [];
              this.discoveredAddr = msg.data.rsp.result.discoveredDevices;
              this.RefreshNodes();
            }
          }
        }

        this.progSpinner = 'none';

      } else {
        this.MessageError(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfEmbedCoordinator_BondedDevices') {
      const data = msg as api.IqrfEmbedCoordinatorBondedDevicesResponse100;

      if (data.data.status === 0) {
        this.bondedAddr = [];
        this.bondedAddr = data.data.rsp.result.bondedDevices;

        this.progSpinner = 'none';

        this.RefreshNodes();

      } else {
        this.MessageError(data.data.status, data.data.statusStr);
      }

    } else if (msg.mType === 'iqrfEmbedCoordinator_ClearAllBonds') {
      const data = msg as api.IqrfEmbedCoordinatorClearAllBondsResponse100;
      console.log(msg);

      this.progSpinner = 'none';
      this.RefreshNodes();

    } else if (msg.mType === 'iqrfEmbedCoordinator_BondNode') {
      console.log(msg);
      this.progSpinner = 'none';
      this.OnBondedDevices();
    }
  }

  MessageError(status: number, statusStr: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Message response error!',
      detail: '[' + status + ']:' + statusStr
    });
    this.progSpinner = 'none';
  }


  RefreshNodes() {
    const nodes = this.layer.find('.node').toArray();

    // All nodes...
    for (const node of nodes) {
      node.setAttrs({
        fill: this.gcolorNodeSlot
      });
    }

    // Bonded nodes...
    for (const node of nodes) {
      for (const ndA of this.bondedAddr) {
        const nid = node.getAttr('nid');
        if (nid === ndA) {
          node.setAttrs({
            fill: this.gcolorNodeBonded
          });
        }
      }
    }

    // Discovered nodes...
    for (const node of nodes) {
      for (const ndA of this.discoveredAddr) {
        const nid = node.getAttr('nid');
        if (nid === ndA) {
          node.setAttrs({
            fill: this.gcolorNodeDiscovered
          });
        }
      }
    }

    this.layer.draw();

  }

  DrawMap() {

    this.layer.destroyChildren();
    this.layer.clear();

    /* frame */
    const rect = new Konva.Rect({
      x: 35,
      y: 20,
      width: 442,
      height: 268,
      fill: this.gcolorGwFill,
      stroke: this.gcolorGwBorder,
      strokeWidth: 4,
      preventDefault: false
    });

    this.layer.add(rect);

    /* Numbering of frame */
    let px = 35;
    for (let i = 0; i <= 19; i++) {

      const numText = new Konva.Text({
        x: px,
        y: 0,        
        text: '' + i,
        width: 20,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: 'grey',
        verticalAlign: 'middle',
        wrap: 'char',
        align: 'center',
        padding: 0
      }); 
      px = px + 22;

      this.layer.add(numText);   
    }

    let py = 28;
    for (let i = 0; i <= 12; i++) {
      
      const numText = new Konva.Text({
        x: 0,
        y: py,        
        text: '' + (i * 20),
        width: 30,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: 'grey',
        verticalAlign: 'middle',
        wrap: 'char',
        align: 'center',
        padding: 0
      }); 
      py = py + 20;

      this.layer.add(numText);   
    }    


    /* Nodes */
    let row = 1, column = 0, rad = 10;

    for (let i = 0; i <= 239; i++) {
      column ++;

      const circle = new Konva.Circle({
        x: 25 + (column * (12 + rad)),
        y: 10 + (row * (12 + rad)),
        radius: rad,        
        fill: this.gcolorNodeSlot,
        name: 'node',
        id: 'id:' + i,
        preventDefault: false              
      });

      circle.setAttr('nid', i);
      
      this.layer.add(circle);   

      if (column >= 20)  {
        row ++;
        column = 0;
      }

    }

/*
    var SOURCE = '/assets/tiger.svg';
    // try to draw SVG natively
    Konva.Image.fromURL(SOURCE, imageNode => {
      this.layer.add(imageNode);
      imageNode.setAttrs({
        x: 460,
        width: 50,
        height: 50
      });
      this.layer.batchDraw();
    });

*/
    // Add to layer
    this.layer.add(rect);

    this.layer.draw();

    // this.DrawAutoNtwProgressBar();

  }

}
