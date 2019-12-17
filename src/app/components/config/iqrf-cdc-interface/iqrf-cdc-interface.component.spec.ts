import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqrfCdcInterfaceComponent } from './iqrf-cdc-interface.component';

describe('IqrfCdcInterfaceComponent', () => {
  let component: IqrfCdcInterfaceComponent;
  let fixture: ComponentFixture<IqrfCdcInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqrfCdcInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqrfCdcInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
