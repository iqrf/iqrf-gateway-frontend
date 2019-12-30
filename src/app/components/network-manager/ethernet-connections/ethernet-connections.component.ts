import { Component, OnInit } from '@angular/core';

interface Connection {
  name: string;
  status: string;

}

@Component({
  selector: 'app-ethernet-connections',
  templateUrl: './ethernet-connections.component.html',
  styleUrls: ['./ethernet-connections.component.css']
})
export class EthernetConnectionsComponent implements OnInit {

  public connections: Connection [] = [];

  constructor() { 

    this.connections.push(
      {
        name: 'eth0',
        status: 'connected'
      }
    )

  }

  ngOnInit() {
  }

}
