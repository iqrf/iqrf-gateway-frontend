import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Paho} from 'ng2-mqtt/mqttws31';

import * as mqttMsgConfig from './mqttMsgConfig';

@Injectable({
  providedIn: 'root'
})
export class MqttMsgService {

  // Debug console traces
  private traces = false;

  private client = null; // : Paho.MQTT.Client = null;
  public status = false; // online/offline
  private timerConnect;
  private pingTimerId;

  // Topics
  private topics: string [] = [];

  // Config...
  public mqttCfg: mqttMsgConfig.MqttMsgConfigSchema100;

  // Emitors
  public emitorOnlineStatus$: EventEmitter<boolean> = new EventEmitter();
  public emitorMessage$: EventEmitter<any> = new EventEmitter();

  constructor(protected http: HttpClient) {
    this.init();

  }

  public init() {
     
    const prom = this.loadConfig();

    prom.then(value => {
      this.OnStart();

      if (this.traces) {
        console.log('Success [MqttService]: ' + JSON.stringify(value));
      }

    }).catch(error => {
      console.log('ERROR [MqttService]: ' + JSON.stringify(error));

    });
    

  }

  loadConfig(): Promise<any> {
    const self = this;

    return new Promise((resolve, reject) => {
      const path = './assets/cfg/mqttMsgConfig.json';
      self.http.get(path).subscribe(data => {
        self.mqttCfg = data as mqttMsgConfig.MqttMsgConfigSchema100;

        if (self.traces) {
          console.log('----mqtt-----');
          console.log(JSON.stringify(self.mqttCfg, null, 1));
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

    if (this.client !== null && this.client !== undefined) {
      // this.client.unsubscribe(this.configService.clientCfg.mqttConfig.topics.respTopic);
      // this.client.unsubscribe(this.respTopic);
      this.client.disconnect();
      this.client = null;
      this.status = false;

    }

  }

  private statusTimer(step: number) {

    for (const topic of this.topics) {
      this.sendMessage(JSON.stringify({
        msg: 'ping'
      }));
    }

    window.clearTimeout(this.pingTimerId);
    this.pingTimerId = window.setTimeout(() => this.statusTimer(step), step);
  }

  private connectionTimer(step: number) {

    if (this.mqttCfg === undefined || this.mqttCfg === null) {
      return;
    }

    if (this.client == null) {
        if (this.traces) {
          console.log('Opening mqtt port...');
        }
        this.mqttStart();

    } else {
        window.clearTimeout(this.timerConnect);
        return;
    }

    window.clearTimeout(this.timerConnect);
    this.timerConnect = window.setTimeout(() => this.connectionTimer(step), step);
  }

  public OnSubscribe(topics: string []) {

    if (this.client !== undefined && this.client !== null) {
      for (const tp of topics) {
        this.client.subscribe(tp);
      }

      this.topics = topics;
    }
  }

  public OnUnsubscribeAll() {
    for (const tp of this.topics) {
      this.client.unsubscribe(tp);
    }
  }


  private mqttStart() {
    
    if (this.mqttCfg === undefined) {
      return;
    }
    
    console.log('MQTT starting....');
  
    const clientId = Math.random().toString(36).substring(7);
    this.client = new Paho.MQTT.Client(this.mqttCfg.endpoint.host, 9001, clientId);

    this.client.onMessageArrived = this.onMessage.bind(this);
    this.client.onConnectionLost = this.onConnectionLost2.bind(this);
    //this.client.onConnect = this.onConnected.bind(this);

    
    const connectOptions = {
      useSSL: false,
    //  keepalive: 60,
      timeout:  6,
      // mqttVersion: 4,
      onSuccess: this.onConnected.bind(this),
      onFailure: this.onFailure.bind(this),
      userName: this.mqttCfg.endpoint.username,
      password: this.mqttCfg.endpoint.password,
    };
    

    this.client.connect(connectOptions, 443);

    console.log('Subscribed...: ');

  }

  onConnected() {
    console.log('MQTT connected....')

    this.OnSubscribe([this.mqttCfg.topics.resp]) ;

  }

  subscribe(responseObject) {
    this.status = true;
   // this.client.subscribe('michalv');
    //this.client.subscribe('michal123');

    this.emitorOnlineStatus$.emit(this.status);


  }

  onFailure(responseObject) {
    this.emitorOnlineStatus$.emit(false);
    this.connectionTimer(2000);

  }

   onConnectionLost2(responseObject) {
    this.emitorOnlineStatus$.emit(false);

    if (responseObject.errorCode !== 0) { // 0: regular log off
      this.OnEnd();
      this.connectionTimer(2000);
    }
   }

   onMessage(message) {
    const self = this;
    
    // console.log('MESSAGE topic: ' + message.destinationName);
    const mm = JSON.parse(message.payloadString);
    // console.log('MESSAGE: ' + JSON.stringify(mm));

    self.emitorMessage$.emit(mm);

  }

  sendMessage( content) {
    if (this.mqttCfg === undefined) {
      return false;
    }
    
    const message = new Paho.MQTT.Message(content);
    message.destinationName = this.mqttCfg.topics.req;

    if (this.client !== null) {
      // window.alert( 'topic' + topic + 'MQTT send: ' + JSON.stringify(content));
      try {
        this.client.send(message);
        return true;
      } catch (e) {
        this.connectionTimer(2000);
        return false;
      }
    }
  }

}
