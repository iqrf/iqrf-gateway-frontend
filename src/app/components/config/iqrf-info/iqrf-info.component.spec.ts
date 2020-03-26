import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqrfInfoComponent } from './iqrf-info.component';

describe('IqrfInfoComponent', () => {
  let component: IqrfInfoComponent;
  let fixture: ComponentFixture<IqrfInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqrfInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqrfInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
