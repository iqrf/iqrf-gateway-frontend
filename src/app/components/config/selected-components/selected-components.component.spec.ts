import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedComponentsComponent } from './selected-components.component';

describe('SelectedComponentsComponent', () => {
  let component: SelectedComponentsComponent;
  let fixture: ComponentFixture<SelectedComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
