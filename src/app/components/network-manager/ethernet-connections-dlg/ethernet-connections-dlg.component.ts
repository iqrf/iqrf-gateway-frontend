import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';

@Component({
  selector: 'app-ethernet-connections-dlg',
  templateUrl: './ethernet-connections-dlg.component.html',
  styleUrls: ['./ethernet-connections-dlg.component.css']
})
export class EthernetConnectionsDlgComponent implements OnInit {

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
  }

  OnSave() {
    this.ref.close('ok');
  }

  OnCancel() {
    this.ref.close();
  }


}
