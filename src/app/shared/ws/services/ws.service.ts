import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as wsConfig from './wsConfig'

@Injectable({
  providedIn: 'root'
})
export class WsService {

  // Debug console traces
  private traces = false;

  // Config
  public wsCfg: wsConfig.WsConfigSchema100;

  public hostname = '';
  private timerConnect;

  // Websocket...
  private connection: WebSocket = null;

  private onlineStatus: boolean = false;

  //public emitLoadConfig$: EventEmitter<boolean> = new EventEmitter();
  public emitorOnlineStatus$: EventEmitter<boolean> = new EventEmitter();
  public emitorMessage$: EventEmitter<any> = new EventEmitter();  
  
  constructor(protected http: HttpClient) { 
    // Get local IP...
    this.hostname = window.location.hostname;    

    this.init();

  }

  public init() {

    let prom = this.loadConfig();

    prom.then(value => {
      this.OnStart();


    }).catch(error => {
      console.log('ERROR [WsService]: ' + JSON.stringify(error));

    });    

  }

  loadConfig(): Promise<any> {
    const self = this;

    return new Promise(function(resolve, reject) {      
      const path = './assets/wsConfig.json';
      self.http.get(path).subscribe(data => {
        self.wsCfg = data as wsConfig.WsConfigSchema100;

        if (self.traces) {
          console.log('----ws-----');
          console.log(self.wsCfg);
        }
          resolve(data);

        },
        err => {
          reject(err);

        }
      );
    });
  }

  public OnStart() {
    this.connectionTimer(2000);
  
  }
  
  public OnEnd() {
    if (this.connection !== null) {
      this.connection.close();
    }
  
  }
  
  public getOnlineStatus(): boolean {
    return this.onlineStatus;
  
  }
  
  public getServerAddress(): string {
  
    if (this.wsCfg == null) {
      return '---';
    }
  
    let srv = ' ';
    if (this.wsCfg.detectServer) {
      srv = 'ws://' + this.hostname + ':' + this.wsCfg.wsPort;
    } else {
      srv = 'ws://' + this.wsCfg.wsIP + ':' + this.wsCfg.wsPort;
    }
  
    return srv;
  }
  
    private connectionTimer(step: number) {
  
      if (this.wsCfg == null) {
        return;
      }
  
      if (this.connection == null) {
          if (this.traces) {
            console.log('Opening ws port...');
          }
          this.open();
  
      } else {
          window.clearTimeout(this.timerConnect);
          return;
      }
  
      window.clearTimeout(this.timerConnect);
      this.timerConnect = window.setTimeout(() => this.connectionTimer(step), step);
    }
  
    open(): boolean {
  
        if (this.connection == null) {
            const srv = this.getServerAddress();
            this.connection = new WebSocket(srv);
        }
  
        const self = this;
  
        this.connection.onopen = (evnt: any) => {
          self.onlineStatus = true;
          self.emitorOnlineStatus$.emit(true);
        };
  
        this.connection.onerror = (evnt: any) => {
          self.onlineStatus = false;
          self.emitorOnlineStatus$.emit(false);
        };
  
        this.connection.onclose = (evnt: any) => {
          self.onlineStatus = false;
          self.emitorOnlineStatus$.emit(false);
          this.connection.close();
          this.connection = null;
          this.connectionTimer(2000);
        };
  
        this.connection.onmessage = (message: any) => {
            this.receivedMessage(message);
        };
  
        return true;
    }
  
    /*
    *
    * This sends message to gateway.
    */
   public sendMessage(msg: string): boolean {
      if (this.connection !== null) {
        this.connection.send(msg);
        return true;

      }

      return false;

    }
   /*
    *
    * This recieves message from gateway.
    */
   public receivedMessage(msg: any) {
  
        const self = this;
  
        let msgStr = '';
  
        try {
            const mm = JSON.parse(msg.data);
            msgStr = msg.data;
  
            self.emitorMessage$.emit(mm);
  
        } catch (e) {
            msgStr = '' + msg.data;
        }
    }  
  
}
