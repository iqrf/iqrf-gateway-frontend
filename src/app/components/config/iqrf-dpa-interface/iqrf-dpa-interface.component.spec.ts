import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqrfDpaInterfaceComponent } from './iqrf-dpa-interface.component';

describe('IqrfDpaInterfaceComponent', () => {
  let component: IqrfDpaInterfaceComponent;
  let fixture: ComponentFixture<IqrfDpaInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqrfDpaInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqrfDpaInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
