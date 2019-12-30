import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iqrf-repository',
  templateUrl: './iqrf-repository.component.html',
  styleUrls: ['./iqrf-repository.component.css']
})
export class IqrfRepositoryComponent implements OnInit {

  public name: string = 'JsCache';
  public repository: string = 'https://repository.iqrfalliance.org/api';
  public period: number = 720;

  constructor() { }

  ngOnInit() {
  }

}
