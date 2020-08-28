import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgGeneralComponent } from './cfg-general.component';

describe('CfgGeneralComponent', () => {
  let component: CfgGeneralComponent;
  let fixture: ComponentFixture<CfgGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
