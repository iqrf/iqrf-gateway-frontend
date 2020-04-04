import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringServicesComponent } from './monitoring-services.component';

describe('MonitoringServicesComponent', () => {
  let component: MonitoringServicesComponent;
  let fixture: ComponentFixture<MonitoringServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
