import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

interface subMenu {
  text: string;
  dpa: string;
}

@Component({
  selector: 'app-send-dpa-packet',
  templateUrl: './send-dpa-packet.component.html',
  styleUrls: ['./send-dpa-packet.component.css']
})
export class SendDpaPacketComponent implements OnInit {

  public ownNadr = false;
  public ownDpaTimeout = false;
  public dpaPacket: string;
  public custNadr: string;
  public dpaTimeout: string;

  items: MenuItem[];

  itemsCoord: subMenu[] = [
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

  itemsNode: subMenu[] = [
    {text: 'Clear prebonded MID', dpa: '01.00.01.03.ff.ff'},
    {text: 'Read prebonded MID', dpa: '01.00.01.02.ff.ff'},
    {text: 'Enable prebonding', dpa: '01.00.01.04.ff.ff.07.01.00.00.00.00'},
    {text: 'Remove bond', dpa: '01.00.01.01.ff.ff'},
    {text: 'Read NTW info', dpa: '01.00.01.00.ff.ff'}
  ];  

  itemsOs: subMenu[] = [
    {text: 'Get information for more peripherals', dpa: '00.00.ff.00.ff.ff'},
    {text: 'Get peripheral information', dpa: '00.00.00.3f.ff.ff'},
    {text: 'Peripheral enumeration', dpa: '00.00.ff.3f.ff.ff'},
    {text: 'Read HWP configuration', dpa: '01.00.02.02.ff.ff'},
    {text: 'Sleep', dpa: '01.00.02.04.ff.ff.00.00.00'},
    {text: 'Run RFPGM', dpa: '00.00.02.03.ff.ff'},
    {text: 'Reset', dpa: '00.00.02.01.ff.ff'},
    {text: 'Read info', dpa: '00.00.02.00.ff.ff'}
  ];  
  
  itemsMem: subMenu[] = [
    {text: 'RAM write', dpa: '00.00.05.01.ff.ff.00.01.02.03.04.05'},
    {text: 'RAM read', dpa: '00.00.05.00.ff.ff.00.05'},
    {text: 'EEEPROM write', dpa: '00.00.04.03.ff.ff.00.00.00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f'},
    {text: 'EEEPROM read', dpa: '00.00.04.02.ff.ff.00.00.10'},
    {text: 'EEPROM write', dpa: '00.00.03.01.ff.ff.00.01.02.03.04.05'},
    {text: 'EEPROM read', dpa: '00.00.03.00.ff.ff.00.05'}
  ];  
  
  constructor() {
    /*
    this.items = [
      {
          label: 'Coordinator',
          items: [
        
              {label: 'DPA params" normal'},
              {label: 'DPA params" testing'},
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash', visible: true, command: (event) => this.OnTest(' ')},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      }
    ];
    */

    this.items= [];

    //Coordinator
    const coord: MenuItem = {
      label: 'Coordinator',
      visible: true,
      items: []
    }    
    this.items.push(coord);

    const coordSub: MenuItem [] = [];
    coord.items = coordSub;

    for (let sm of this.itemsCoord) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      }
      coordSub.push(it);
    }

    //Node
    const node: MenuItem = {
      label: 'Noode',
      visible: true,
      items: []
    }    
    this.items.push(node);

    const nodeSub: MenuItem [] = [];
    node.items = nodeSub;

    for (let sm of this.itemsNode) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      }
      nodeSub.push(it);
    }

    //Os
    const osNode: MenuItem = {
      label: 'OS, Peripheral info',
      visible: true,
      items: []
    }    
    this.items.push(osNode);

    const osNodeSub: MenuItem [] = [];
    osNode.items = osNodeSub;

    for (let sm of this.itemsOs) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      }
      osNodeSub.push(it);
    }    


    //Memories
    const memNode: MenuItem = {
      label: 'Memories',
      visible: true,
      items: []
    }    
    this.items.push(memNode);

    const memNodeSub: MenuItem [] = [];
    memNode.items = memNodeSub;

    for (let sm of this.itemsMem) {
      const it: MenuItem = {
        label: sm.text,
        visible: true,
        command: (event) => this.OnTest(sm)
      }
      memNodeSub.push(it);
    }       


   }

  ngOnInit() {
  }

  OnTest(sm: subMenu) {
   // window.alert(sm.text);

    this.dpaPacket = sm.dpa;
  }

}
