import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import { MenuItem } from 'primeng/api';
import { WsMsgsService } from './services/ws-msgs.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animation', [
        state('visible', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('void => *', [
            style({transform: 'translateX(50%)', opacity: 0}),
            animate('300ms ease-out')
        ]),
        transition('* => void', [
            animate(('250ms ease-in'), style({
                height: 0,
                opacity: 0,
                transform: 'translateX(50%)'
            }))
        ])
    ])
],
encapsulation: ViewEncapsulation.None  
})
export class AppComponent implements OnInit {
    
  title = 'iqrf-gateway-webapp';
  visibleSidebar1;
  items: MenuItem[];

  constructor(public wsMsgs: WsMsgsService) {
  }    

  ngOnInit() {
    this.items = [
        {
            label: 'Gateway',
            icon: 'pi pi-pw pi-desktop',
            items: [
                {label: 'Information', routerLink: ['/gateway-info']},
                {label: 'Logger file',  routerLink: ['/gateway-logger-file']},        
                {label: 'Change mode', routerLink: ['/gateway-change-mode']},
                {label: 'Service control', routerLink: ['/gateway-service-control']},
                {label: 'Power control', routerLink: ['/gateway-power-control']},
                {label: 'PIXLA', routerLink: ['/gateway-pixla']}
            ]
        },
        {
            label: 'Configuration',
            icon: 'pi pi-fw pi-cog',
            items: [
                {label: 'Selected components', routerLink: ['/config-selected-components']},
                {label: 'IQRF SPI interface', routerLink: ['/config-iqrf-spi-interface']},
                {label: 'IQRF CDC interface', routerLink: ['/config-iqrf-cdc-interface']},
                {label: 'IQRF UART interface', routerLink: ['/config-iqrf-uart-interface']},
                {label: 'IQRF DPA interface', routerLink: ['/config-iqrf-dpa-interface']},
                {label: 'IQRF repository', routerLink: ['/config-iqrf-repository']},
                {label: 'MQTT interface', routerLink: ['/config-mqtt-interface']},
                {label: 'WebSocket interface', routerLink: ['/config-websocket-interface']},
                {label: 'MQ interface', routerLink: ['/config-mq-interface']},
                {label: 'UDP interface', routerLink: ['/config-udp-interface']},
                {label: 'Scheduler', routerLink: ['/config-scheduler']},
                {label: 'Tracer file', routerLink: ['/config-tracer-file']},
                {label: 'Configuration migration', routerLink: ['/config-configuration-migration']}
            ]
        },
        {
            label: 'IQRF network',
            icon: 'pi pi-fw pi-share-alt',
            items: [
                {label: 'Send DPA packet', routerLink: ['/iqrf-network-send-dpa-packet']},
                {label: 'Send JSON request', routerLink: ['/iqrf-network-send-json-request']},
                {label: 'TR configuration', routerLink: ['/iqrf-network-tr-configuration']},
                {label: 'TR upload', routerLink: ['/iqrf-network-tr-upload']},
                {label: 'Network manager', routerLink: ['/iqrf-network-network-manager']},
                {label: 'Standard manager', routerLink: ['/iqrf-network-standard-manager']}               
            ]
        },
        {
            label: 'Clouds',
            icon: 'pi pi-fw pi-cloud',
            items: [
                {label: 'IBM Cloud', routerLink: ['/clouds-ibm']},
                {label: 'Microsoft Azure', routerLink: ['/clouds-azure']},
                {label: 'Amazon AWS', routerLink: ['/clouds-aws']},                
                {label: 'Hexio IoT Platform', routerLink: ['/clouds-hexio']},
                {label: 'Inteliments inteliGlue', routerLink: ['/clouds-inteliglue']},
                {label: 'Pixla', routerLink: ['/clouds-pixla']},                
            ]
        },
        {
            label: 'User manager', icon: 'pi pi-fw pi-user', routerLink: ['/user-manager']
        }
        
    ];
}

}