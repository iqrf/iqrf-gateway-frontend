import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './components/gateway/info/info.component';
import { LoggerFileComponent } from './components/gateway/logger-file/logger-file.component';
import { ChangeModeComponent } from './components/gateway/change-mode/change-mode.component';
import { ServiceControlComponent } from './components/gateway/service-control/service-control.component';
import { PowerControlComponent } from './components/gateway/power-control/power-control.component';
import { PixlaComponent } from './components/gateway/pixla/pixla.component';
import { SelectedComponentsComponent } from './components/config/selected-components/selected-components.component';
import { IqrfSpiInterfaceComponent } from './components/config/iqrf-spi-interface/iqrf-spi-interface.component';
import { IqrfCdcInterfaceComponent } from './components/config/iqrf-cdc-interface/iqrf-cdc-interface.component';
import { IqrfUartInterfaceComponent } from './components/config/iqrf-uart-interface/iqrf-uart-interface.component';
import { IqrfDpaInterfaceComponent } from './components/config/iqrf-dpa-interface/iqrf-dpa-interface.component';
import { IqrfRepositoryComponent } from './components/config/iqrf-repository/iqrf-repository.component';
import { MqttInterfaceComponent } from './components/config/mqtt-interface/mqtt-interface.component';
import { WebsocketInterfaceComponent } from './components/config/websocket-interface/websocket-interface.component';
import { MqInterfaceComponent } from './components/config/mq-interface/mq-interface.component';
import { UdpInterfaceComponent } from './components/config/udp-interface/udp-interface.component';
import { SchedulerComponent } from './components/config/scheduler/scheduler.component';
import { TracerFileComponent } from './components/config/tracer-file/tracer-file.component';
import { ConfigurationMigrationComponent } from './components/config/configuration-migration/configuration-migration.component';
import { SendDpaPacketComponent } from './components/iqrf-network/send-dpa-packet/send-dpa-packet.component';
import { SendJsonRequestComponent } from './components/iqrf-network/send-json-request/send-json-request.component';
import { TrConfigurationComponent } from './components/iqrf-network/tr-configuration/tr-configuration.component';
import { TrUploadComponent } from './components/iqrf-network/tr-upload/tr-upload.component';
import { NetworkManagerComponent } from './components/iqrf-network/network-manager/network-manager.component';
import { StandardManagerComponent } from './components/iqrf-network/standard-manager/standard-manager.component';
import { IbmComponent } from './components/clouds/ibm/ibm.component';
import { AzureComponent } from './components/clouds/azure/azure.component';
import { AwsComponent } from './components/clouds/aws/aws.component';
import { TcPisekComponent } from './components/clouds/tc-pisek/tc-pisek.component';
import { InteliglueComponent } from './components/clouds/inteliglue/inteliglue.component';
import { UserManagerComponent } from './components//user-manager/user-manager.component';



const routes: Routes = [
  { path: 'gateway-info', component: InfoComponent },
  { path: 'gateway-change-mode', component: ChangeModeComponent },
  { path: 'gateway-logger-file', component: LoggerFileComponent },
  { path: 'gateway-service-control', component: ServiceControlComponent },
  { path: 'gateway-power-control', component: PowerControlComponent },
  { path: 'gateway-pixla', component: PixlaComponent },
  { path: 'config-selected-components', component: SelectedComponentsComponent },
  { path: 'config-iqrf-spi-interface', component: IqrfSpiInterfaceComponent },
  { path: 'config-iqrf-cdc-interface', component: IqrfCdcInterfaceComponent },
  { path: 'config-iqrf-uart-interface', component: IqrfUartInterfaceComponent },
  { path: 'config-iqrf-dpa-interface', component: IqrfDpaInterfaceComponent },
  { path: 'config-iqrf-repository', component: IqrfRepositoryComponent },
  { path: 'config-mqtt-interface', component: MqttInterfaceComponent },
  { path: 'config-websocket-interface', component: WebsocketInterfaceComponent },
  { path: 'config-mq-interface', component: MqInterfaceComponent },
  { path: 'config-udp-interface', component: UdpInterfaceComponent },
  { path: 'config-scheduler', component: SchedulerComponent },
  { path: 'config-tracer-file', component: TracerFileComponent },
  { path: 'config-configuration-migration', component: ConfigurationMigrationComponent },
  { path: 'iqrf-network-send-dpa-packet', component: SendDpaPacketComponent },
  { path: 'iqrf-network-send-json-request', component: SendJsonRequestComponent },
  { path: 'iqrf-network-tr-configuration', component: TrConfigurationComponent },
  { path: 'iqrf-network-tr-upload', component: TrUploadComponent },
  { path: 'iqrf-network-network-manager', component: NetworkManagerComponent },
  { path: 'iqrf-network-standard-manager', component: StandardManagerComponent },
  { path: 'clouds-ibm', component: IbmComponent },
  { path: 'clouds-azure', component: AzureComponent },
  { path: 'clouds-aws', component: AwsComponent },
  { path: 'clouds-tcp-pisek', component: TcPisekComponent },
  { path: 'clouds-inteliglue', component: InteliglueComponent },
  { path: 'user-manager', component: UserManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
