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

  public emitorMsgApi$: EventEmitter<any> = new EventEmitter();

  public signIn: apiHttp.SignInResponse100 = {
    token: ''
  };

  constructor(public http: HttpClient) {
    console.log('GWAPI --------');

    const signIn: apiHttp.SignInRequest100 = {
      username: 'iqrf',
      password: 'iqrf'
    };

    this.SignIn(signIn);
   }

   public msgResponse(type: string, data: any) {

    if (type === 'signIn') {
      console.log(JSON.stringify(data, null, 1));
      this.signIn = data;

      this.gatewayInfo();

    } else if (type === 'version') {
      const json: apiHttp.VersionResponse100 = data;
      // console.log(JSON.stringify(json, null, 1));


    } else if (type === 'gatewayInfo') {
      this.emitorMsgApi$.emit(data);
      // console.log(JSON.stringify(data, null, 1));

    } else if (type === '/config/iqrf::IqrfSpi') {
      this.configSpi = data;
      // console.log('SPI: ' + JSON.stringify(this.configSpi, null, 1));

    } else if (type === '/config/iqrf::IqrfCdc') {
      this.configCdc = data;
      // console.log('SPI: ' + JSON.stringify(this.configSpi, null, 1));

    } else if (type === '/config/iqrf::IqrfUart') {
      this.configUart = data;
      // console.log('UART: ' + JSON.stringify(this.configSpi, null, 1));

    } else if (type === '/config/iqrf::IqrfDpa') {
      this.configDpa = data;
      console.log('Dpa: ' + JSON.stringify(this.configDpa, null, 1));

    } else if (type === '/config/iqrf::IqrfInfo') {
      this.configInfo = data;
      console.log('Info: ' + JSON.stringify(this.configInfo, null, 1));

    }

   }

   SignIn(signIn: apiHttp.SignInRequest100) {
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

  Version() {
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

  gatewayInfo() {
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

  configComponent(component: string) {
    const self = this;

    const headersI = { Accept: 'application/json', Authorization: 'Bearer ' + this.signIn.token};

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
}

