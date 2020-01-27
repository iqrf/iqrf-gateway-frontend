import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/api';
import { EthernetConnectionsDlgComponent } from '../ethernet-connections-dlg/ethernet-connections-dlg.component';

interface Connection {
  name: string;
  status: string;

}

@Component({
  selector: 'app-ethernet-connections',
  templateUrl: './ethernet-connections.component.html',
  styleUrls: ['./ethernet-connections.component.css'],
  providers: [DialogService]
})
export class EthernetConnectionsComponent implements OnInit {

  public connections: Connection [] = [];

  constructor(public dialogService: DialogService) { 

    this.connections.push(
      {
        name: 'eth0',
        status: 'connected'
      }
    )

  }

  ngOnInit() {
  }

  show() {
    const ref = this.dialogService.open(EthernetConnectionsDlgComponent, {
        header: 'Edit Ethernet connection',
        width: '60%'
    });

    ref.onClose.subscribe((res) => {
      if (res) {
          window.alert(res);
      } else {
       // window.alert('just close');
      }
  });
}  

}
