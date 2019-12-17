import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerFileComponent } from './logger-file.component';

describe('LoggerFileComponent', () => {
  let component: LoggerFileComponent;
  let fixture: ComponentFixture<LoggerFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
