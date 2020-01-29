import { Injectable, EventEmitter } from '@angular/core';
import { WsService } from '../shared/ws/services/ws.service';
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

  // Where to dispatch message back...
  public msgBack: MsgHeader;
  public msgPipe: Array<MsgHeader> = [];

  // Emitors...
  public emitorJson$: EventEmitter<any> = new EventEmitter();
  public emitorDpa$: EventEmitter<any> = new EventEmitter();
  public emitorNtwMgr$: EventEmitter<any> = new EventEmitter();

  constructor(public ws: WsService) {
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

    try {
        if (json.mType) {
          if (json.mType === 'iqrfEmbedCoordinator_Discovery') {
            this.emitorNtwMgr$.emit(json);

          } else if (json.mType === 'iqrfEmbedCoordinator_DiscoveredDevices') {
            this.emitorNtwMgr$.emit(json);

          } else if (json.mType === 'iqrfEmbedCoordinator_BondedDevices') {
            this.emitorNtwMgr$.emit(json);

          } else if (json.mType === 'iqrfEmbedCoordinator_ClearAllBonds') {
            this.emitorNtwMgr$.emit(json);

          } else if (json.mType === 'iqrfEmbedCoordinator_BondNode') {
            this.emitorNtwMgr$.emit(json);

          } else if (json.mType === 'iqrfEmbedCoordinator_ClearRemotelyBondedMid') {
            this.emitorNtwMgr$.emit(json);

          }


          this.SendToComponent(json);
/*
          if (this.traces) {

            console.log('---------WsMsgsService:parseIncomingMsg()---------')
            console.log(json);

          }
*/

          if (json.mType === 'rdsGetProjectList') {


          } else if (json.mType === 'rdsGetProject') {


          } else {
            // Unknown Message
            // window.alert('msg: ' + JSON.stringify(json));
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
  public msg_iqrfEmbedCoordinator_ClearAllBonds(): boolean {
    const json: api.IqrfEmbedCoordinatorClearAllBondsRequest100 = {
      mType: 'iqrfEmbedCoordinator_ClearAllBonds',
      data: {
          msgId: 'webApp -' + Math.floor(Math.random() * 100) + 1,
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

  public msg_iqrfEmbedCoordinator_ClearRemotelyBondedMid(): boolean {
    const json: api.IqrfEmbedCoordinatorClearRemotelyBondedMidRequest100 = {
      mType: 'iqrfEmbedCoordinator_ClearRemotelyBondedMid',
      data: {
          msgId: 'webApp -' + Math.floor(Math.random() * 100) + 1,
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

  public msg_iqrfEmbedCoordinator_RemoveBond(bondAddrI: number): boolean {
    const json: api.IqrfEmbedCoordinatorRemoveBondRequest100 = {
      mType: 'iqrfEmbedCoordinator_RemoveBond',
      data: {
          msgId: 'webApp -' + Math.floor(Math.random() * 100) + 1,
          req: {
            nAdr: 0,
            param: {
              bondAddr: 1
            }
          },
          returnVerbose: true
      }
    };
    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinator_BondNode(reqAddrIn: number): boolean {
    const json: api.IqrfEmbedCoordinatorBondNodeRequest100 = {
      mType: 'iqrfEmbedCoordinator_BondNode',
      data: {
          msgId: 'webApp -' + Math.floor(Math.random() * 100) + 1,
          timeout: 11000,
          req: {
            nAdr: 0,
            param: {
              reqAddr: reqAddrIn,
              bondingMask: 0
            }
          },
          returnVerbose: true,
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinator_BondedDevices(): boolean {
    const json: api.IqrfEmbedCoordinatorBondedDevicesRequest100 = {
      mType: 'iqrfEmbedCoordinator_BondedDevices',
      data: {
          msgId: 'webApp -' + Math.floor(Math.random() * 100) + 1,
          timeout: 11000,
          req: {
            nAdr: 0,
            param: {}
          },
          returnVerbose: true,
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinator_DiscoveredDevices() {
    const json: api.IqrfEmbedCoordinatorDiscoveredDevicesRequest100 = {
      mType: 'iqrfEmbedCoordinator_DiscoveredDevices',
      data: {
          msgId: 'webApp -' + Math.floor(Math.random() * 100) + 1,
          req: {
            nAdr: 0,
            param: {}
          },
          returnVerbose: true,
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }

  public msg_iqrfEmbedCoordinatorDiscovery(discTxPowerI: number, discMaxNdAddrI: number) {
    const json: api.IqrfEmbedCoordinatorDiscoveryRequest100 = {
      mType: 'iqrfEmbedCoordinator_Discovery',
      data: {
          msgId: 'webApp -' + Math.floor(Math.random() * 100) + 1,
          req: {
            nAdr: 0,
            param: {
              txPower: discTxPowerI,
              maxAddr: discMaxNdAddrI
            }
          },
          returnVerbose: true,
      }
    };

    // Send message
    return this.ws.sendMessage(JSON.stringify(json));
  }  
}
