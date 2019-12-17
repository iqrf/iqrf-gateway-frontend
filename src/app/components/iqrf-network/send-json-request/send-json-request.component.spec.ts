import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJsonRequestComponent } from './send-json-request.component';

describe('SendJsonRequestComponent', () => {
  let component: SendJsonRequestComponent;
  let fixture: ComponentFixture<SendJsonRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendJsonRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendJsonRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
