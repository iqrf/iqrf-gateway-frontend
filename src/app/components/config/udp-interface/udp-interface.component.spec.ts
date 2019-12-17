import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdpInterfaceComponent } from './udp-interface.component';

describe('UdpInterfaceComponent', () => {
  let component: UdpInterfaceComponent;
  let fixture: ComponentFixture<UdpInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdpInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdpInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
