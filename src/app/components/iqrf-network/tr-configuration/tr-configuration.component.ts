import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { WsMsgsService } from '../../../services/ws-msgs.service';
import * as api from '../../../api';
import Swal from 'sweetalert2';
import {ConfirmationService} from 'primeng/api';


interface City {
  name: string;
}

@Component({
  selector: 'app-tr-configuration',
  templateUrl: './tr-configuration.component.html',
  styleUrls: ['./tr-configuration.component.css'],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class TrConfigurationComponent implements OnInit {

  public address = 0;
  public status = -1;

  public tr2: api.IqmeshNetworkReadTrConfResponse100 = {
    mType: 'iqmeshNetwork_ReadTrConf',
    data: {
        msgId: 'testIqmeshRead',
        rsp: {
            deviceAddr: 1,
            embPers: {
                values: [
                    254,
                    6,
                    0,
                    0
                ],
                coordinator: false,
                node: true,
                os: true,
                eeprom: true,
                eeeprom: true,
                ram: true,
                ledr: true,
                ledg: true,
                spi: false,
                io: true,
                thermometer: true,
                pwm: false,
                uart: false,
                frc: false
            },
            customDpaHandler: true,
            dpaPeerToPeer: true,
            dpaAutoexec: false,
            routingOff: false,
            ioSetup: false,
            peerToPeer: false,
            neverSleep: false,
            stdAndLpNetwork: true,
            rfChannelA: 25,
            rfChannelB: 2,
            txPower: 7,
            rxFilter: 5,
            lpRxTimeout: 6,
            rfAltDsmChannel: 0,
            uartBaudrate: 115200,
            rfPgmDualChannel: true,
            rfPgmLpMode: false,
            rfPgmIncorrectUpload: false,
            rfPgmEnableAfterReset: false,
            rfPgmTerminateAfter1Min: true,
            rfPgmTerminateMcuPin: true,
            rfBand: '868'
        },
        raw: [],
        status: -1,
        statusStr: 'ok',
        insId: 'iqrfgd2-default'
    }

  };

  // RF
  public rfBandOptions: SelectItem [];
  public rfBand = '868';
  public rfChannelA: number;
  public rfChannelB: number;
  public txPower: number;
  public rxFilter: number;
  public lpRxTimeout: number;
  public stdAndLpNetwork = false;

  // RFPGM
  public rfPgmEnableAfterReset = false;
  public rfPgmTerminateAfter1Min = false;
  public rfPgmTerminateMcuPin = false;
  public rfPgmDualChannel = false;
  public rfPgmLpMode = false;
  public rfPgmIncorrectUpload = false;
  public rfAltDsmChannel = 0;

  // Embedded peripherals
  public eeprom = false;
  public eeeprom = false;
  public ram = false;
  public ledr = false;
  public ledg = false;
  public spi = false;
  public io = false;
  public thermometer = false;
  public uart = false;
  public frc = false;
  public coordinator = false;
  public node = false;
  public os = false;
  public pwm = false;

  // Other
  public customDpaHandler = false;
  public ioSetup = false;
  public dpaAutoexec = false;
  public routingOff = false;
  public peerToPeer = false;
  public dpaPeerToPeer = false;
  public neverSleep = false;
  public enDpa = false;

  public uartBaudrateOptions: SelectItem [];
  public uartBaudrate = 57600;

  public inputformat: SelectItem [];
  public selInputFormat = 'ASCII';

  public password: string;

  public progSpinner = '';
  public progSpinnerTimer;

  constructor(public wsMsg: WsMsgsService, public messageService: MessageService, private confirmationService: ConfirmationService) {

    this.rfBandOptions = [
      {label: 'Select Band', value: null},
      {label: '433', value: '433'},
      {label: '868', value: '868'},
      {label: '916', value: '916'}
    ];

    this.uartBaudrateOptions = [
      {label: '1200 Bd', value: 1200},
      {label: '2400 Bd', value: 2400},
      {label: '4800 Bd', value: 4800},
      {label: '19200 Bd', value: 19200},
      {label: '38400 Bd', value: 38400},
      {label: '57600 Bd', value: 57600},
      {label: '115200 Bd', value: 115200},
      {label: '230400 Bd', value: 230400}
    ];

    this.inputformat = [
      {label: 'ASCII', value: 'ASCII'},
      {label: 'HEX', value: 'HEX'}
    ];

    // Incomming message
    wsMsg.emitorTrConf$.subscribe( w => { this.IncommingMessage(w); });

   }

  ngOnInit() {
  }

  public Spinner(what: string) {


    this.progSpinner = what;

    clearTimeout(this.progSpinnerTimer);
    this.progSpinnerTimer = setTimeout(() => this.SpinnerClear(true), 4000);

  }

  public SpinnerClear(timeout: boolean) {
    clearTimeout(this.progSpinnerTimer);
    this.progSpinnerTimer = undefined;
    this.progSpinner = '';

    if (timeout) {

      this.messageService.add({
        severity: 'error',
        summary: 'No response!',
        detail: 'We do not have response from gateway :('
      });

    }
  }

  IncommingMessage(msg: any) {
     console.log('--IncommingMessage--');
     console.log(JSON.stringify(msg, null, 1));

     try {
      if (msg.mType === 'iqmeshNetwork_ReadTrConf') {

        const data = msg as api.IqmeshNetworkReadTrConfResponse100;
        this.LoadData(data);
        this.SpinnerClear(false);

        if (data.data.status !== 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error [' + data.data.status + ']',
            detail: data.data.statusStr
          });
        }

        /*
        if (data.data.status === 0) {

        } else {

        }
        */

      } else if (msg.mType === 'iqmeshNetwork_WriteTrConf') {

        const data = msg as api.IqmeshNetworkWriteTrConfResponse100;

        if (data.data.status !== 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error [' + data.data.status + ']',
            detail: data.data.statusStr
          });
        }

        /*
        if (data.data.status === 0) {

        } else {

        }
        */

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

  public OnRead() {
    this.Spinner('reading');
    this.wsMsg.msg_iqmeshNetwork_ReadTrConf(this.wsMsg.idTrConfig, this.address);

  }

  public OnSave() {
   // this.wsMsg.msg_iqmeshNetwork_ReadTrConf(this.wsMsg.idTrConfig, this.address);
   const msg: api.IqmeshNetworkWriteTrConfRequest100 = this.SaveData();
   const ret = this.wsMsg.msg_any(this.wsMsg.idTrConfig, msg);

   if (!ret) {
    this.messageService.add({
      severity: 'error',
      summary: 'Message service error!',
      detail: 'Error sending msg...'
    });
   }

  }

  public LoadData(tr: api.IqmeshNetworkReadTrConfResponse100) {
    this.status = tr.data.status;

    if (this.status === 0) {
      if ('rsp' in tr.data) {
        if ('rfBand' in tr.data.rsp) {
          this.rfBand = tr.data.rsp.rfBand;
        }
        if ('rfChannelA' in tr.data.rsp) {
          this.rfChannelA = tr.data.rsp.rfChannelA;
        }
        if ('rfChannelB' in tr.data.rsp) {
          this.rfChannelB = tr.data.rsp.rfChannelB;
        }
        if ('stdAndLpNetwork' in tr.data.rsp) {
          this.stdAndLpNetwork = tr.data.rsp.stdAndLpNetwork;
        }
        if ('txPower' in tr.data.rsp) {
          this.txPower = tr.data.rsp.txPower;
        }
        if ('rxFilter' in tr.data.rsp) {
          this.rxFilter = tr.data.rsp.rxFilter;
        }
        if ('lpRxTimeout' in tr.data.rsp) {
          this.lpRxTimeout = tr.data.rsp.lpRxTimeout;
        }
        /* rfpgm */
        if ('rfPgmEnableAfterReset' in tr.data.rsp) {
          this.rfPgmEnableAfterReset = tr.data.rsp.rfPgmEnableAfterReset;
        }
        if ('rfPgmTerminateAfter1Min' in tr.data.rsp) {
          this.rfPgmTerminateAfter1Min = tr.data.rsp.rfPgmTerminateAfter1Min;
        }
        if ('rfPgmTerminateMcuPin' in tr.data.rsp) {
          this.rfPgmTerminateMcuPin = tr.data.rsp.rfPgmTerminateMcuPin;
        }
        if ('rfPgmDualChannel' in tr.data.rsp) {
          this.rfPgmDualChannel = tr.data.rsp.rfPgmDualChannel;
        }
        if ('rfPgmLpMode' in tr.data.rsp) {
          this.rfPgmLpMode = tr.data.rsp.rfPgmLpMode;
        }
        if ('rfPgmIncorrectUpload' in tr.data.rsp) {
          this.rfPgmIncorrectUpload = tr.data.rsp.rfPgmIncorrectUpload;
        }
        if ('rfAltDsmChannel' in tr.data.rsp) {
          this.rfAltDsmChannel = tr.data.rsp.rfAltDsmChannel;
        }
        /* DPA*/
        if ('customDpaHandler' in tr.data.rsp) {
          this.customDpaHandler = tr.data.rsp.customDpaHandler;
        }
        if ('ioSetup' in tr.data.rsp) {
          this.ioSetup = tr.data.rsp.ioSetup;
        }
        if ('dpaAutoexec' in tr.data.rsp) {
          this.dpaAutoexec = tr.data.rsp.dpaAutoexec;
        }
        if ('routingOff' in tr.data.rsp) {
          this.routingOff = tr.data.rsp.routingOff;
        }
        if ('peerToPeer' in tr.data.rsp) {
          this.peerToPeer = tr.data.rsp.peerToPeer;
        }
        if ('dpaPeerToPeer' in tr.data.rsp) {
          this.dpaPeerToPeer = tr.data.rsp.dpaPeerToPeer;
        }
        if ('neverSleep' in tr.data.rsp) {
          this.neverSleep = tr.data.rsp.neverSleep;
        }
        if ('uartBaudrate' in tr.data.rsp) {
          this.uartBaudrate = tr.data.rsp.uartBaudrate;
        }
        /* Emb per */
        if ('embPers' in tr.data.rsp) {
          if ('eeprom' in tr.data.rsp.embPers) {
            this.eeprom = tr.data.rsp.embPers.eeprom;
          }
          if ('eeeprom' in tr.data.rsp.embPers) {
            this.eeeprom = tr.data.rsp.embPers.eeeprom;
          }
          if ('ram' in tr.data.rsp.embPers) {
            this.ram = tr.data.rsp.embPers.ram;
          }
          if ('ledr' in tr.data.rsp.embPers) {
            this.ledr = tr.data.rsp.embPers.ledr;
          }
          if ('ledg' in tr.data.rsp.embPers) {
            this.ledg = tr.data.rsp.embPers.ledg;
          }
          if ('spi' in tr.data.rsp.embPers) {
            this.spi = tr.data.rsp.embPers.spi;
          }
          if ('io' in tr.data.rsp.embPers) {
            this.io = tr.data.rsp.embPers.io;
          }
          if ('thermometer' in tr.data.rsp.embPers) {
            this.thermometer = tr.data.rsp.embPers.thermometer;
          }
          if ('uart' in tr.data.rsp.embPers) {
            this.uart = tr.data.rsp.embPers.uart;
          }
          if ('frc' in tr.data.rsp.embPers) {
            this.frc = tr.data.rsp.embPers.frc;
          }
          if ('coordinator' in tr.data.rsp.embPers) {
            this.coordinator = tr.data.rsp.embPers.coordinator;
          }
          if ('node' in tr.data.rsp.embPers) {
            this.node = tr.data.rsp.embPers.node;
          }
          if ('os' in tr.data.rsp.embPers) {
            this.os = tr.data.rsp.embPers.os;
          }
          if ('pwm' in tr.data.rsp.embPers) {
            this.pwm = tr.data.rsp.embPers.pwm;
          }
        }
      }
    }
  }

  public SaveData(): api.IqmeshNetworkWriteTrConfRequest100 {
    const tr: api.IqmeshNetworkWriteTrConfRequest100 = {
      mType: 'iqmeshNetwork_WriteTrConf',
      data: {
          msgId: 'testIqmeshRead',
          repeat: 1,
          req: {
              deviceAddr: 1,
              embPers: {
                  values: [
                      254,
                      6,
                      0,
                      0
                  ],
                  coordinator: this.coordinator,
                  node: this.node,
                  os: this.os,
                  eeprom: this.eeprom,
                  eeeprom: this.eeeprom,
                  ram: this.ram,
                  ledr: this.ledr,
                  ledg: this.ledg,
                  spi: this.spi,
                  io: this.io,
                  thermometer: this.thermometer,
                  pwm: this.pwm,
                  uart: this.uart,
                  frc: this.frc
              },
              customDpaHandler: this.customDpaHandler,
              dpaPeerToPeer: this.dpaPeerToPeer,
              dpaAutoexec: this.dpaAutoexec,
              routingOff: this.routingOff,
              ioSetup: this.ioSetup,
              peerToPeer: this.peerToPeer,
              neverSleep: this.neverSleep,
              stdAndLpNetwork: this.stdAndLpNetwork,
              rfChannelA: this.rfChannelA,
              rfChannelB: this.rfChannelB,
              txPower: this.txPower,
              rxFilter: this.rxFilter,
              lpRxTimeout: this.lpRxTimeout,
              rfAltDsmChannel: this.rfAltDsmChannel,
              uartBaudrate: this.uartBaudrate,
              rfPgmDualChannel: this.rfPgmDualChannel,
              rfPgmLpMode: this.rfPgmLpMode,
              rfPgmIncorrectUpload: this.rfPgmIncorrectUpload,
              rfPgmEnableAfterReset: this.rfPgmEnableAfterReset,
              rfPgmTerminateAfter1Min: this.rfPgmTerminateAfter1Min,
              rfPgmTerminateMcuPin: this.rfPgmTerminateMcuPin,
              rfBand: this.rfBand
          },
          returnVerbose: true
      }
    };


    return tr;
  }


}
