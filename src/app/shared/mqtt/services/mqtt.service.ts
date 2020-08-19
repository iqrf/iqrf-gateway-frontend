import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Paho} from 'ng2-mqtt/mqttws31';
import * as crypto from 'crypto-js';
import * as moment from 'moment';

import * as mqttConfig from './mqttConfig';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  // Debug console traces
  private traces = false;

  private client = null; // : Paho.MQTT.Client = null;
  public status = false; // online/offline
  private timerConnect;
  private pingTimerId;

  // Topics
  private topics: string [] = [];

  // Config...
  public mqttCfg: mqttConfig.MqttConfigSchema100;

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
      const path = './assets/cfg/mqttConfig.json';
      self.http.get(path).subscribe(data => {
        self.mqttCfg = data as mqttConfig.MqttConfigSchema100;

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
      this.sendMessage(topic, JSON.stringify({
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

      // this.statusTimer(40000);
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

    const endpoint = this.createEndpoint(
    this.mqttCfg.awsEndpoint.region,             // Your Region
    this.mqttCfg.awsEndpoint.awsIotEndpoint,     // Req. 'lowercamelcase'!!:
                                                                 // 'aws iot describe-endpoint --endpoint-type iot:Data-ATS'
    this.mqttCfg.awsEndpoint.accessKey,          // your Access Key ID
    this.mqttCfg.awsEndpoint.secretKey);         // Secret Access Key

    const clientId = Math.random().toString(36).substring(7);
    this.client = new Paho.MQTT.Client(endpoint, clientId);

    this.client.onMessageArrived = this.onMessage.bind(this);
    this.client.onConnectionLost = this.onConnectionLost2.bind(this);

    const connectOptions = {
      useSSL: true,
    //  keepalive: 60,
      timeout:  6,
      mqttVersion: 4,
      onSuccess: this.subscribe.bind(this),
      onFailure: this.onFailure.bind(this)
    };

    this.client.connect(connectOptions, 443);

    console.log('Subscribed...: ');

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
    //const mm = JSON.parse(message.payloadString);

    self.emitorMessage$.emit(message);

    // console.log('MESSAGE topic: ' + message.destinationName);
    // console.log('MESSAGE: ' + JSON.stringify(mm));

  }

  sendMessage(topic, content) {
    const message = new Paho.MQTT.Message(content);
    message.destinationName = topic;

    if (this.client !== null) {
      // window.alert( 'topic' + topic + 'MQTT send: ' + JSON.stringify(content));
      try {
        this.client.send(message);
      } catch (e) {
        this.connectionTimer(2000);
      }
    }
  }

  public createEndpoint(regionName, awsIotEndpoint, accessKeyI, secretKeyI): string {
    const time = moment.utc();
    const dateStamp = time.format('YYYYMMDD');
    const amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
    const service = 'iotdevicegateway';
    const region = regionName;
    const secretKey = secretKeyI;
    const accessKey = accessKeyI;
    const algorithm = 'AWS4-HMAC-SHA256';
    const method = 'GET';
    const canonicalUri = '/mqtt';
    const host = awsIotEndpoint;

    const credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
    let canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
    canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
    canonicalQuerystring += '&X-Amz-Date=' + amzdate;
    canonicalQuerystring += '&X-Amz-SignedHeaders=host';

    const canonicalHeaders = 'host:' + host + '\n';
    const payloadHash = this.sha256('');
    const canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring +
     '\n' + canonicalHeaders + '\nhost\n' + payloadHash;

    const stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  this.sha256(canonicalRequest);
    const signingKey = this.getSignatureKey(secretKey, dateStamp, region, service);
    const signature = this.sign(signingKey, stringToSign);

    canonicalQuerystring += '&X-Amz-Signature=' + signature;
    return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
  }


  public getSignatureKey2(key, date, region, service): string {
    const kDate = crypto.HmacSHA256(date, 'AWS4' + key);
    const kRegion = crypto.HmacSHA256(region, kDate);
    const kService = crypto.HmacSHA256(service, kRegion);
    const kSigning = crypto.HmacSHA256('aws4_request', kService);
    return kSigning;
  }


  public sign(key, msg) {
    const hash = crypto.HmacSHA256(msg, key);
    return hash.toString(crypto.enc.Hex);
  };

  public sha256(msg) {
    const hash = crypto.SHA256(msg);
    return hash.toString(crypto.enc.Hex);
  }

  public getSignatureKey(key, dateStamp, regionName, serviceName): string {
    const kDate = crypto.HmacSHA256(dateStamp, 'AWS4' + key);
    const kRegion = crypto.HmacSHA256(regionName, kDate);
    const kService = crypto.HmacSHA256(serviceName, kRegion);
    const kSigning = crypto.HmacSHA256('aws4_request', kService);
    return kSigning;
  }
}
