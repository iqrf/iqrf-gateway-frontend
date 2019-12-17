import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteliglueComponent } from './inteliglue.component';

describe('InteliglueComponent', () => {
  let component: InteliglueComponent;
  let fixture: ComponentFixture<InteliglueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteliglueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteliglueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
