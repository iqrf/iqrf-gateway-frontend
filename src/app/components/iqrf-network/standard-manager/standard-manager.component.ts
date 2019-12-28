import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard-manager',
  templateUrl: './standard-manager.component.html',
  styleUrls: ['./standard-manager.component.css']
})
export class StandardManagerComponent implements OnInit {

  // IQRF Binary output
  public boAddress: number;
  public boIndex: number;
  public boState = false;

  // IQRF Light
  public lgAddress: number;
  public lgIndex: number;
  public lgPower: number;

  // IQRF Sensor
  public snsAddress: number;

  // IQRF DALI
  public daliAddress: number;
  public daliCommands: number [] = [];

  constructor() { 
    this.daliCommands.push(1);
  }

  ngOnInit() {
  }

  OnAddCommand() {
    this.daliCommands.push(1);
  }

  OnRemoveCommand() {
    this.daliCommands.pop();
  }  

}
