import { Injectable, EventEmitter } from '@angular/core';
import { WsService } from '../shared/ws/services/ws.service';
import { MqttService } from '../shared/mqtt/services/mqtt.service';
import * as api from '../api';

export interface MsgHeader {
  mType: string;
  msgId: string;
  confirm: boolean;
  emit: EventEmitter<any>;
}

@Injectable({
  providedIn: 'root'
})
export class WsMsgsService {

  // Debug traces
  private traces = true;
  public status = false;

  // Random MsgId part
  public msgIdRand: number;

  // Where to dispatch message back...
  public msgBack: MsgHeader;
  public msgPipe: Array<MsgHeader> = [];

  // Emitors...
  public emitorJson$: EventEmitter<any> = new EventEmitter();
  public emitorDpa$: EventEmitter<any> = new EventEmitter();
  public emitorNtwMgr$: EventEmitter<any> = new EventEmitter();
  public emitorTrConf$: EventEmitter<any> = new EventEmitter();
  public emitorStdMgr$: EventEmitter<any> = new EventEmitter();

  // Components ids
  public idNtwMgr = 'netwMgr';
  public idSendDpa = 'sendDpa';
  public idTrConfig = 'trsConfig';
  public idStdMgr = 'idStdMgr';

  constructor(public ws: WsService, public mqtt: MqttService) {
    this.msgIdRand = Math.floor(Math.random() * 100) + 1;

    // Indicates online/offline change
    ws.emitorOnlineStatus$.subscribe( w => { this.EventWsOnlineStatus(w); });

    // Incomming message
    ws.emitorMessage$.subscribe( w => { this.parseIncomingMsg(w); });

   }

  /* When WS gets online */
  public EventWsOnlineStatus(w: boolean) {



    if (w) {
      this.status = w;

      if (this.traces) {
        console.log('--------WsMsgsService--------');
        console.log('>> online <<');
        console.log('-----------------------------');
      }

    } else {
      this.status = w;

      if (this.traces) {
        console.log('--------WsMsgsService--------');
        console.log('>> offline <<');
        console.log('-----------------------------');
      }
    }
  }

  /* Sends with confirmation */
  public sendMessageConfirm(msg: any, sender: EventEmitter<any>): boolean {
    if (msg === undefined) {
      return;
    }
    if ('mType' in msg) {
      if ('data' in msg) {
        if ('msgId' in msg.data) {
          this.msgBack = {
            mType: msg.mType,
            msgId: msg.data.msgId,
            confirm: true,
            emit: sender
          };

          this.sendMessage(msg);
          return true;
        }
      }
    }

    return false;

  }


  /* Sends message over WS */
  public sendMessage(data: any): boolean {
    return this.ws.sendMessage(JSON.stringify(data));

  }

  private parseIncomingMsg(json: any) {

    // console.log('JSON: ', JSON.stringify(json, null, 1));

    try {
        if (json.mType) {
          if (json.mType === 'messageError') {
            console.log('JSON MSG ERROR: ', JSON.stringify(json, null, 1));
          } else {
            if (json.data.msgId) {
              if (json.data.msgId.indexOf(this.msgIdRand.toString())  === -1) {
                // Not our message
                return;
              }

              if (json.data.msgId.indexOf(this.idNtwMgr.toString()) !== -1) { // NetworkManagerComponent
                this.emitorNtwMgr$.emit(json);

              } else if (json.data.msgId.indexOf(this.idSendDpa.toString()) !== -1) { // SendDpaPacketComponent
                this.emitorDpa$.emit(json);

              } else if (json.data.msgId.indexOf(this.idTrConfig.toString()) !== -1) { // TrConfigurationComponent
                this.emitorTrConf$.emit(json);

              } else if (json.data.msgId.indexOf(this.idStdMgr.toString()) !== -1) { // StandardManagerComponent
                this.emitorStdMgr$.emit(json);

              }
            }
          }
        }
      } catch (e) {
              console.log('This doesn\'t look like a valid JSON: ', json);
              console.log('exception: ', e.toString());
              return;
      }
  }

  public SendToComponent(json: any) {

    if (this.msgBack !== undefined) {
      if (this.msgBack.confirm) {
        if (json.mType) {
          if (json.data) {
            if (json.data.msgId) {

              if (json.mType === this.msgBack.mType
                && json.data.msgId === this.msgBack.msgId) {

                  /*
                  console.log('---------WsMsgsService:Great response---------')
                  console.log(json)
                  */

                  this.msgBack.emit.emit(json);
                  return;

              }

              if (json.mType === 'messageError') {
                this.msgBack.emit.emit(json);
                return;
              }
            }
          }
        }
      }
    }
  }

  /****** MESSAGES *******/
  public msg_iqrfEmbedCoordinator_ClearAllBonds(id: string): boolean {
    const json: api.IqrfEmbedCoordinatorClearAllBondsRequest100 = {
      mType: 'iqrfEmbedCoordinator_ClearAllBonds',
      data: {
          msgId: id + 'msg_iqrfEmbedCoordinator_ClearAllBonds:' + this.msgIdRand.toString(),
          req: {
            nAdr: 0,
            param: {}
          },
          returnVerbose: true
      }
    };
    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinator_ClearRemotelyBondedMid(id: string): boolean {
    const json: api.IqrfEmbedCoordinatorClearRemotelyBondedMidRequest100 = {
      mType: 'iqrfEmbedCoordinator_ClearRemotelyBondedMid',
      data: {
          msgId: id + 'msg_iqrfEmbedCoordinator_ClearRemotelyBondedMid:' + this.msgIdRand.toString(),
          req: {
            nAdr: 0,
            param: {}
          },
          returnVerbose: true
      }
    };
    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinator_RemoveBond(id: string, bondAddrI: number): boolean {
    const json: api.IqrfEmbedCoordinatorRemoveBondRequest100 = {
      mType: 'iqrfEmbedCoordinator_RemoveBond',
      data: {
          msgId: id + 'msg_iqrfEmbedCoordinator_RemoveBond:' + this.msgIdRand.toString(),
          req: {
            nAdr: 0,
            param: {
              bondAddr: bondAddrI
            }
          },
          returnVerbose: true
      }
    };
    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  /**
   * 
   * @param id : Address if node to be unbonded. Address 255 unbonds all nodes.
   * @param bondAddrI 
   */
  public msg_iqmeshNetwork_RemoveBond(id: string, bondAddrI: number): boolean {
    const json: api.IqmeshNetworkRemoveBondRequest100 = {
      mType: 'iqmeshNetwork_RemoveBond',
      data: {
          msgId: id + 'msg_iqmeshNetwork_RemoveBond:' + this.msgIdRand.toString(),
          repeat: 2,
          req: {
            deviceAddr: bondAddrI
          },
          returnVerbose: true
      }
    };
    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }


  /**
   * 
   * @param id 
   * @param deviceAddrI : Address where to bond node.
   */
  public msg_iqmeshNetwork_BondNodeLocal(id: string, deviceAddrI: number): boolean {
    const json: api.IqmeshNetworkBondNodeLocalRequest100 = {
      mType: 'iqmeshNetwork_BondNodeLocal',
      data: {
          msgId: id + 'msg_iqmeshNetwork_BondNodeLocal:' + this.msgIdRand.toString(),
          req: {
            deviceAddr: deviceAddrI
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinator_BondedDevices(id: string): boolean {
    const json: api.IqrfEmbedCoordinatorBondedDevicesRequest100 = {
      mType: 'iqrfEmbedCoordinator_BondedDevices',
      data: {
          msgId: id + 'msg_iqrfEmbedCoordinator_BondedDevices:' + this.msgIdRand.toString(),
          timeout: 11000,
          req: {
            nAdr: 0,
            param: {}
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinator_DiscoveredDevices(id: string) {
    const json: api.IqrfEmbedCoordinatorDiscoveredDevicesRequest100 = {
      mType: 'iqrfEmbedCoordinator_DiscoveredDevices',
      data: {
          msgId: id + 'msg_iqrfEmbedCoordinator_DiscoveredDevices:' + this.msgIdRand.toString(),
          req: {
            nAdr: 0,
            param: {}
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinatorDiscovery(id: string, discTxPowerI: number, discMaxNdAddrI: number) {
    const json: api.IqrfEmbedCoordinatorDiscoveryRequest100 = {
      mType: 'iqrfEmbedCoordinator_Discovery',
      data: {
          msgId: id + 'msg_iqrfEmbedCoordinatorDiscovery:' + this.msgIdRand.toString(),
          req: {
            nAdr: 0,
            param: {
              txPower: discTxPowerI,
              maxAddr: discMaxNdAddrI
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedFrc_SendSelective(id: string) {
    const json: api.IqrfEmbedFrcSendSelectiveRequest100 = {
      mType: 'iqrfEmbedFrc_SendSelective',
      data: {
          msgId: id + 'msg_iqrfEmbedFrc_SendSelective:' + this.msgIdRand.toString(),
          req: {
            nAdr: 0,
            param: {
              frcCommand: 2,
              selectedNodes: [
                1,
                2
              ],
              userData: [
                5,
                1,
                1,
                255,
                255
              ]
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfRaw(id: string, rDataIn: string) {
    const json: api.IqrfRawRequest100 = {
      mType: 'iqrfRaw',
      data: {
          msgId: id + 'msg_iqrfRaw:' + this.msgIdRand.toString(),
          req: {
            rData: rDataIn
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_any(id: string, jsonIn: any) {
    jsonIn.data.msgId = id + 'msg_any:' + this.msgIdRand.toString();

    // Send message
    return this.ws.sendMessage(JSON.stringify(jsonIn));
  }

  public msg_iqmeshNetwork_AutoNetwork(id: string, wavesI: number, emptyWavesI: number) {
    const json: api.IqmeshNetworkAutoNetworkRequest100 = {
      mType: 'iqmeshNetwork_AutoNetwork',
      data: {
          msgId: id + 'msg_iqmeshNetwork_AutoNetwork:' + this.msgIdRand.toString(),
          req: {
            discoveryTxPower: 1,
            discoveryBeforeStart: false,
            actionRetries: 1,
            stopConditions: {
                waves: wavesI,
                emptyWaves: emptyWavesI
            }
          },
          returnVerbose: true
      }
    };

    console.log(JSON.stringify(json, null, 1));

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqmeshNetwork_ReadTrConf(id: string, deviceAddrI: number) {
    const json: api.IqmeshNetworkReadTrConfRequest100 = {
      mType: 'iqmeshNetwork_ReadTrConf',
      data: {
          msgId: id + 'msg_iqmeshNetwork_ReadTrConf:' + this.msgIdRand.toString(),
          repeat: 2,
          req: {
            deviceAddr: deviceAddrI
          },
          returnVerbose: true
      }
    };

    // console.log(JSON.stringify(json));

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfBinaryoutput_Enumerate(id: string, nAdrI: number) {
    const json: api.IqrfBinaryoutputEnumerateRequest100 = {
      mType: 'iqrfBinaryoutput_Enumerate',
      data: {
          msgId: id + 'msg_iqrfBinaryoutput_Enumerate:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {}
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfBinaryoutput_SetOutput(id: string, nAdrI: number, binOutsI: {index: number, state: boolean} []) {
    const json: api.IqrfBinaryoutputSetOutputRequest100 = {
      mType: 'iqrfBinaryoutput_SetOutput',
      data: {
          msgId: id + 'msg_iqrfBinaryoutput_SetOutput:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {
              binOuts: binOutsI
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfLight_Enumerate(id: string, nAdrI: number) {
    const json: api.IqrfLightEnumerateRequest100 = {
      mType: 'iqrfLight_Enumerate',
      data: {
          msgId: id + 'msg_iqrfLight_Enumerate:' + this.msgIdRand.toString(),
          timeout: 2,
          req: {
            nAdr: nAdrI,
            param: {}
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfLight_SetPower(id: string, nAdrI: number, lightsI: {index: number, power: number} []) {
    const json: api.IqrfLightSetPowerRequest100 = {
      mType: 'iqrfLight_SetPower',
      data: {
          msgId: id + 'msg_iqrfLight_SetPower:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {
              lights: lightsI
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfLight_IncrementPower(id: string, nAdrI: number, lightsI: {index: number, power: number} []) {
    const json: api.IqrfLightIncrementPowerRequest100 = {
      mType: 'iqrfLight_IncrementPower',
      data: {
          msgId: id + 'msg_iqrfLight_IncrementPower:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {
              lights: lightsI
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfLight_DecrementPower(id: string, nAdrI: number, lightsI: {index: number, power: number} []) {
    const json: api.IqrfLightDecrementPowerRequest100 = {
      mType: 'iqrfLight_DecrementPower',
      data: {
          msgId: id + 'msg_iqrfLight_DecrementPower:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {
              lights: lightsI
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfSensor_Enumerate(id: string, nAdrI: number) {
    const json: api.IqrfSensorEnumerateRequest100 = {
      mType: 'iqrfSensor_Enumerate',
      data: {
          msgId: id + 'msg_iqrfSensor_Enumerate:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {}
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfSensor_ReadSensorsWithTypes(id: string, nAdrI: number, sensorIndexesI: number []) {
    const json: api.IqrfSensorReadSensorsWithTypesRequest100 = {
      mType: 'iqrfSensor_ReadSensorsWithTypes',
      data: {
          msgId: id + 'msg_iqrfSensor_ReadSensorsWithTypes:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {
              sensorIndexes: sensorIndexesI
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfDali_SendCommands(id: string, nAdrI: number, commandsI: number []) {
    const json: api.IqrfDaliSendCommandsRequest100 = {
      mType: 'iqrfDali_SendCommands',
      data: {
          msgId: id + 'msg_iqrfDali_SendCommands:' + this.msgIdRand.toString(),
          req: {
            nAdr: nAdrI,
            param: {
              commands: commandsI
            }
          },
          returnVerbose: true
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }  

}
