import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthernetConnectionsComponent } from './ethernet-connections.component';

describe('EthernetConnectionsComponent', () => {
  let component: EthernetConnectionsComponent;
  let fixture: ComponentFixture<EthernetConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthernetConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthernetConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
