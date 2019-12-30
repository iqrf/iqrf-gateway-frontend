import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Shared services
import { WsModule } from './shared/ws/ws.module';

//Primeng modules
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {PanelModule} from 'primeng/panel';
import {MenubarModule} from 'primeng/menubar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';



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
import { TracerFileComponent } from './components/config/tracer-file/tracer-file.component';
import { SchedulerComponent } from './components/config/scheduler/scheduler.component';
import { ConfigurationMigrationComponent } from './components/config/configuration-migration/configuration-migration.component';
import { SendDpaPacketComponent } from './components/iqrf-network/send-dpa-packet/send-dpa-packet.component';
import { SendJsonRequestComponent } from './components/iqrf-network/send-json-request/send-json-request.component';
import { TrConfigurationComponent } from './components/iqrf-network/tr-configuration/tr-configuration.component';
import { TrUploadComponent } from './components/iqrf-network/tr-upload/tr-upload.component';
import { NetworkManagerComponent } from './components/iqrf-network/network-manager/network-manager.component';
import { StandardManagerComponent } from './components/iqrf-network/standard-manager/standard-manager.component';
import { AzureComponent } from './components/clouds/azure/azure.component';
import { AwsComponent } from './components/clouds/aws/aws.component';
import { IbmComponent } from './components/clouds/ibm/ibm.component';
import { InteliglueComponent } from './components/clouds/inteliglue/inteliglue.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { InfoComponent } from './components/gateway/info/info.component';
import { LoggerFileComponent } from './components/gateway/logger-file/logger-file.component';
import { ChangeModeComponent } from './components/gateway/change-mode/change-mode.component';
import { ServiceControlComponent } from './components/gateway/service-control/service-control.component';
import { PowerControlComponent } from './components/gateway/power-control/power-control.component';
import { PixlaComponent } from './components/clouds/pixla/pixla.component';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { HexioComponent } from './components/clouds/hexio/hexio.component';
import { EthernetConnectionsComponent } from './components/network-manager/ethernet-connections/ethernet-connections.component';



@NgModule({
  declarations: [
    AppComponent,
    SelectedComponentsComponent,
    IqrfSpiInterfaceComponent,
    IqrfCdcInterfaceComponent,
    IqrfUartInterfaceComponent,
    IqrfDpaInterfaceComponent,
    IqrfRepositoryComponent,
    MqttInterfaceComponent,
    WebsocketInterfaceComponent,
    MqInterfaceComponent,
    UdpInterfaceComponent,
    TracerFileComponent,
    SchedulerComponent,
    ConfigurationMigrationComponent,
    SendDpaPacketComponent,
    SendJsonRequestComponent,
    TrConfigurationComponent,
    TrUploadComponent,
    NetworkManagerComponent,
    StandardManagerComponent,
    AzureComponent,
    AwsComponent,
    IbmComponent,    
    InteliglueComponent,
    UserManagerComponent,
    InfoComponent,
    LoggerFileComponent,
    ChangeModeComponent,
    ServiceControlComponent,
    PowerControlComponent,
    PixlaComponent,
    HexioComponent,
    EthernetConnectionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    ButtonModule,
    PanelMenuModule,
    ToolbarModule,
    SplitButtonModule,
    FieldsetModule,
    CardModule,
    WsModule,
    InputTextareaModule,
    FormsModule,
    ProgressSpinnerModule,
    ToastModule,
    TabViewModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    PasswordModule,
    PanelModule,
    MenubarModule,
    FileUploadModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
