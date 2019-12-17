import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqrfSpiInterfaceComponent } from './iqrf-spi-interface.component';

describe('IqrfSpiInterfaceComponent', () => {
  let component: IqrfSpiInterfaceComponent;
  let fixture: ComponentFixture<IqrfSpiInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqrfSpiInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqrfSpiInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
