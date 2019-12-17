import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDpaPacketComponent } from './send-dpa-packet.component';

describe('SendDpaPacketComponent', () => {
  let component: SendDpaPacketComponent;
  let fixture: ComponentFixture<SendDpaPacketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDpaPacketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDpaPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
