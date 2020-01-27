import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

interface City {
  name: string;
}

@Component({
  selector: 'app-tr-configuration',
  templateUrl: './tr-configuration.component.html',
  styleUrls: ['./tr-configuration.component.css']
})
export class TrConfigurationComponent implements OnInit {

  //RF
  public rfBand: SelectItem [];
  public selRfBand = '868';
  public address: number;
  public rfChannelA: number;
  public rfChannelB: number;
  public txPower: number;
  public rxFilter: number;
  public lpRxTimeout: number;
  public stdLp = true;

  //RFPGM
  public enAfterReset = false;
  public terminationAfter = true;
  public terminationByMcu = true;
  public dualChannel = false;
  public LPmode = false;
  public incorrectupload = false;

  //Embedded peripherals
  public eeprom = true;
  public eeeprom = true;
  public ram = true;
  public ledr = true;
  public ledg = true;
  public spi = false;
  public io = true;
  public thermometer = true;
  public uart = true;
  public frc = true;

  //other
  public custDpa = false;
  public ioSetup = false;
  public autoexec = false;
  public routingOff = false;
  public enPtp = false;  
  public enDpa = false;  
  public stayAwake = false;  

  public baudRates: SelectItem [];
  public selBaudRate = '57600 Bd';

  public inputformat: SelectItem [];
  public selInputFormat = 'ASCII';

  public password: string;

  constructor() {
    this.rfBand = [
      {label: 'Select Band', value: null},
      {label: '433', value: '433'},
      {label: '868', value: '868'},
      {label: '916', value: '916'}
    ];

    this.baudRates = [
      {label:'1200 Bd', value: '1200 Bd'},
      {label:'2400 Bd', value: '2400 Bd'},
      {label:'4800 Bd', value: '4800 Bd'},
      {label:'19200 Bd', value: '19200 Bd'},
      {label:'38400 Bd', value: '38400 Bd'},
      {label:'57600 Bd', value: '57600 Bd'},
      {label:'115200 Bd', value: '115200 Bd'},
      {label:'230400 Bd', value: '230400 Bd'}
    ]; 
    
    this.inputformat = [
      {label:'ASCII', value: 'ASCII'},      
      {label:'HEX', value: 'HEX'}
    ];    

   }

  ngOnInit() {
  }

}
