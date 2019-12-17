import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttInterfaceComponent } from './mqtt-interface.component';

describe('MqttInterfaceComponent', () => {
  let component: MqttInterfaceComponent;
  let fixture: ComponentFixture<MqttInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MqttInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
