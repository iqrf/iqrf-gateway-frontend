import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqrfUartInterfaceComponent } from './iqrf-uart-interface.component';

describe('IqrfUartInterfaceComponent', () => {
  let component: IqrfUartInterfaceComponent;
  let fixture: ComponentFixture<IqrfUartInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqrfUartInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqrfUartInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
