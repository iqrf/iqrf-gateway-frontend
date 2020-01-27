import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthernetConnectionsDlgComponent } from './ethernet-connections-dlg.component';

describe('EthernetConnectionsDlgComponent', () => {
  let component: EthernetConnectionsDlgComponent;
  let fixture: ComponentFixture<EthernetConnectionsDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthernetConnectionsDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthernetConnectionsDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
