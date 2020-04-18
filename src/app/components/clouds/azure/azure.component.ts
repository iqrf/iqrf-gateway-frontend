import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-azure',
  templateUrl: './azure.component.html',
  styleUrls: ['./azure.component.css']
})
export class AzureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  OnPdfGuide() {
    window.open('https://github.com/iqrfsdk/iot-starter-kit/blob/master/install/pdf/iqrf-part3a.pdf');

  }


  OnVideoGuide() {
    window.open('https://www.youtube.com/watch?v=Z9R2vdaw3KA&feature=youtu.be');

  }

}
