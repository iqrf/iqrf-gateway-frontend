import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixlaComponent } from './pixla.component';

describe('PixlaComponent', () => {
  let component: PixlaComponent;
  let fixture: ComponentFixture<PixlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
