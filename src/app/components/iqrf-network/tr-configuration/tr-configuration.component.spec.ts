import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrConfigurationComponent } from './tr-configuration.component';

describe('TrConfigurationComponent', () => {
  let component: TrConfigurationComponent;
  let fixture: ComponentFixture<TrConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
