import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardManagerComponent } from './standard-manager.component';

describe('StandardManagerComponent', () => {
  let component: StandardManagerComponent;
  let fixture: ComponentFixture<StandardManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
