import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { resolve } from 'url';
import * as apiHttp from '../api_http';

@Injectable({
  providedIn: 'root'
})
export class HttpMsgsService {

  public apiPath = 'http://192.168.1.227/api/v0';

  // Cache data
  public gwInfo: apiHttp.GatewayInfoResponse100;
  public configSpi: apiHttp.ConfigComponentResponse100;
  public configCdc: apiHttp.ConfigComponentResponse100;
  public configUart: apiHttp.ConfigComponentResponse100;
  public configDpa: apiHttp.ConfigComponentResponse100;
  public configInfo: apiHttp.ConfigComponentResponse100;
  public configMqtt: apiHttp.ConfigComponentResponse100;
  public configWs: apiHttp.ConfigComponentResponse100;
  public configUdp: apiHttp.ConfigComponentResponse100;
  public configTraceFile: apiHttp.ConfigComponentResponse100;
  public configJsonMetaData: apiHttp.ConfigComponentResponse100;
  public configMqMsg: apiHttp.ConfigComponentResponse100;
  public configMonitorServ: apiHttp.ConfigComponentResponse100;
  public configWsCpp: apiHttp.ConfigComponentResponse100;
  public configJsCache: apiHttp.ConfigComponentResponse100;

  public emitorMsgApi$: EventEmitter<any> = new EventEmitter();
  public emitorApiUpdated$: EventEmitter<any> = new EventEmitter();
  public emitorApiSaved$: EventEmitter<boolean> = new EventEmitter();
  public emitorPowerOff$: EventEmitter<any> = new EventEmitter();
  public emitorReboot$: EventEmitter<any> = new EventEmitter();

  public signIn: apiHttp.SignInResponse100 = {
    token: ''
  };

  constructor(public http: HttpClient) {
    console.log('GWAPI --------');

    const signIn: apiHttp.SignInRequest100 = {
      username: 'iqrf',
      password: 'iqrf'
    };

    this.PostSignIn(signIn);
   }

   public msgResponse(type: string, data: any) {

    if (type === 'signIn') {
      console.log(JSON.stringify(data, null, 1));
      this.signIn = data;

      this.GetGatewayInfo();

    } else if (type === 'version') {
      const json: apiHttp.VersionResponse100 = data;
      // console.log(JSON.stringify(json, null, 1));


    } else if (type === 'gatewayInfo') {
      this.emitorMsgApi$.emit(data);
      // console.log(JSON.stringify(data, null, 1));

    } else if (type === '/config/iqrf::IqrfSpi') {
      this.configSpi = data;
      this.emitorApiUpdated$.emit(this.configSpi);
      // console.log('SPI: ' + JSON.stringify(this.configSpi, null, 1));

    } else if (type === '/config/iqrf::IqrfCdc') {
      this.configCdc = data;
      this.emitorApiUpdated$.emit(this.configCdc);
      // console.log('SPI: ' + JSON.stringify(this.configSpi, null, 1));

    } else if (type === '/config/iqrf::IqrfUart') {
      this.configUart = data;
      this.emitorApiUpdated$.emit(this.configUart);
      // console.log('UART: ' + JSON.stringify(this.configSpi, null, 1));

    } else if (type === '/config/iqrf::IqrfDpa') {
      this.configDpa = data;
      console.log('Dpa: ' + JSON.stringify(this.configDpa, null, 1));
      this.emitorApiUpdated$.emit(this.configDpa);

    } else if (type === '/config/iqrf::IqrfInfo') {
      this.configInfo = data;
      console.log('Info: ' + JSON.stringify(this.configInfo, null, 1));
      this.emitorApiUpdated$.emit(this.configInfo);

    } else if (type === '/config/iqrf::MqttMessaging') {
      this.configMqtt = data;
      console.log('Info: ' + JSON.stringify(this.configMqtt, null, 1));
      this.emitorApiUpdated$.emit(this.configMqtt);

    } else if (type === '/config/iqrf::WebsocketMessaging') {
      this.configWs = data;
      console.log('Info: ' + JSON.stringify(this.configWs, null, 1));
      this.emitorApiUpdated$.emit(this.configWs);

    } else if (type === '/config/iqrf::UdpMessaging') {
      this.configUdp = data;
      console.log('Info: ' + JSON.stringify(this.configUdp, null, 1));
      this.emitorApiUpdated$.emit(this.configUdp);

    } else if (type === '/config/shape::TraceFileService') {
      this.configTraceFile = data;
      console.log('Info: ' + JSON.stringify(this.configTraceFile, null, 1));
      this.emitorApiUpdated$.emit(this.configTraceFile);

    } else if (type === '/config/iqrf::JsonMngMetaDataApi') {
      this.configJsonMetaData = data;
      console.log('JsonMngMetaDataApi Info: ' + JSON.stringify(this.configJsonMetaData, null, 1));
      this.emitorApiUpdated$.emit(this.configJsonMetaData);

    } else if (type === '/config/iqrf::MqMessaging') {
      this.configMqMsg = data;
      console.log('Info: ' + JSON.stringify(this.configMqMsg, null, 1));
      this.emitorApiUpdated$.emit(this.configMqMsg);

    } else if (type === '/config/iqrf::MonitorService') {
      this.configMonitorServ = data;
      console.log('Info: ' + JSON.stringify(this.configMonitorServ, null, 1));
      this.emitorApiUpdated$.emit(this.configMonitorServ);

    } else if (type === '/config/shape::WebsocketCppService') {
      this.configWsCpp = data;
      console.log('Info: ' + JSON.stringify(this.configWsCpp, null, 1));
      this.emitorApiUpdated$.emit(this.configWsCpp);

    } else if (type === '/config/iqrf::JsCache') {
      this.configJsCache = data;
      console.log('Info: ' + JSON.stringify(this.configJsCache, null, 1));
      this.emitorApiUpdated$.emit(this.configJsCache);

    }

   }

   PostSignIn(signIn: apiHttp.SignInRequest100) {
    const self = this;

    this.http.post<any>(this.apiPath + '/user/signIn', signIn).subscribe({
        next: data => {
          const resp = data as apiHttp.SignInResponse100;
          self.msgResponse('signIn', resp);

        },
        error: error => {
          console.log(JSON.stringify(error, null, 1));
        }
    });
  }

  GetVersion() {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    this.http.get<any>(this.apiPath + '/version', { headers: headersI }).subscribe({
        next: data => {
          const resp = data as apiHttp.VersionResponse100;
          self.msgResponse('version', resp);

        },
        error: error => {
          console.log('Error: ' + JSON.stringify(error, null, 1));
        }
    });
  }

  GetGatewayInfo() {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    this.http.get<any>(this.apiPath + '/gateway/info', { headers: headersI }).subscribe({
        next: data => {
          // console.log('OK ' + JSON.stringify(data, null, 1));
          const resp = data as apiHttp.GatewayInfoResponse100;
          this.gwInfo = resp;

          self.msgResponse('gatewayInfo', resp);

        },
        error: error => {
          console.log('Error: ' + JSON.stringify(error, null, 1));
        }
    });
  }

  GetConfigComponent(component: string) {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    // const component2 = encodeURIComponent(component);
    // console.log('before:' + component + '   after: ' + component2);

    this.http.get<any>(this.apiPath + '/config/' + component, { headers: headersI }).subscribe({
        next: data => {
          console.log('OK ' + JSON.stringify(data, null, 1));
          const resp = data as apiHttp.ConfigComponentResponse100;

          self.msgResponse('/config/' + component, resp);

        },
        error: error => {
          console.log('Error: ' + JSON.stringify(error, null, 1));
        }
    });
  }

  PutConfigComponentInstance(component: string, instance: string, body: any) {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    // console.log('path: ' + JSON.stringify(this.apiPath + '/config/' + component + '/' + instance));
    // console.log('body: ' + JSON.stringify(body, null, 1));

    const instance2 = instance.replace(/\//g, '%2F');

    // console.log('instance2: ' + instance2);

    this.http.put<any>(this.apiPath + '/config/' + component + '/' + instance2, body, { headers: headersI }).subscribe({
        next: data => {
          console.log('PutConfigComponentInstance OK ' + JSON.stringify(data, null, 1));
          this.emitorApiSaved$.emit(data);

        },
        error: error => {
          console.log('PutConfigComponentInstance Error: ' + JSON.stringify(error, null, 1));
          this.emitorApiSaved$.emit(error);
        }
    });
  }

  PostConfigComponent(component: string, body: any) {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    console.log('path: ' + JSON.stringify(this.apiPath + '/config/' + component));
    console.log('body: ' + JSON.stringify(body, null, 1));

    // const instance2 = instance.replace(/\//g, '%2F');

    //console.log('instance2: ' + instance2);

    this.http.post<any>(this.apiPath + '/config/' + component, body, { headers: headersI }).subscribe({
        next: data => {
          console.log('PostConfigComponentInstance OK ' + JSON.stringify(data, null, 1));
          this.emitorApiSaved$.emit(data);

        },
        error: error => {
          console.log('PostConfigComponentInstance Error: ' + JSON.stringify(error, null, 1));
          this.emitorApiSaved$.emit(error);
        }
    });
  }

  DeleteConfigComponentInstance(component: string, instanceName: string) {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    console.log('path: ' + JSON.stringify(this.apiPath + '/config/' + component + '/' + instanceName));
    // console.log('body: ' + JSON.stringify(body, null, 1));

    const instanceName2 = instanceName.replace(/\//g, '%2F');

    // console.log('instance2: ' + instance2);

    this.http.delete<any>(this.apiPath + '/config/' + component + '/' + instanceName2, { headers: headersI }).subscribe({
        next: data => {
          console.log('DeleteConfigComponentInstance OK ' + JSON.stringify(data, null, 1));
          this.emitorApiSaved$.emit(data);

        },
        error: error => {
          console.log('DeleteConfigComponentInstance Error: ' + JSON.stringify(error, null, 1));
          this.emitorApiSaved$.emit(error);
        }
    });
  }

  PostGatewayPowerOff() {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    this.http.post<any>(this.apiPath + '/gateway/poweroff', null, { headers: headersI }).subscribe({
        next: data => {
          self.emitorPowerOff$.emit(data);
          console.log(JSON.stringify(data, null, 1));
        },
        error: error => {
          self.emitorPowerOff$.emit(error);
          console.log(JSON.stringify(error, null, 1));
        }
    });
  }

  PostGatewayReboot() {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    this.http.post<any>(this.apiPath + '/gateway/reboot', null, { headers: headersI }).subscribe({
        next: data => {
          self.emitorReboot$.emit(data);
          console.log(JSON.stringify(data, null, 1));
        },
        error: error => {
          self.emitorReboot$.emit(error);
          console.log(JSON.stringify(error, null, 1));
        }
    });
  }

  PostCloudManager(clouds: string, body: any) {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

    console.log('path: ' + JSON.stringify(this.apiPath + clouds));
    console.log('body: ' + JSON.stringify(body, null, 1));

    // const instance2 = instance.replace(/\//g, '%2F');

    //console.log('instance2: ' + instance2);

    this.http.post<any>(this.apiPath + clouds, body, { headers: headersI }).subscribe({
        next: data => {
          console.log('PostCloudManager OK ' + JSON.stringify(data, null, 1));
          this.emitorApiSaved$.emit(data);

        },
        error: error => {
          console.log('PostCloudManager Error: ' + JSON.stringify(error, null, 1));
          this.emitorApiSaved$.emit(error);
        }
    });
  }

}

