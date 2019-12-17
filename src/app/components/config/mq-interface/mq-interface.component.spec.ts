import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MqInterfaceComponent } from './mq-interface.component';

describe('MqInterfaceComponent', () => {
  let component: MqInterfaceComponent;
  let fixture: ComponentFixture<MqInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MqInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MqInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
