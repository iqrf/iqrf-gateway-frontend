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

  // Emitors...
  public emitorJson$: EventEmitter<any> = new EventEmitter();
  public emitorDpa$: EventEmitter<any> = new EventEmitter();

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
  public sendMessage(data: any) {
    this.ws.sendMessage(JSON.stringify(data));

  }

  private parseIncomingMsg(json: any) {

    try {
        if (json.mType) {

          this.SendToComponent(json);



          if (this.traces) {

            console.log('---------WsMsgsService:parseIncomingMsg()---------')
            console.log(json)

          }


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

    if (this.msgBack != undefined) {
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
}
