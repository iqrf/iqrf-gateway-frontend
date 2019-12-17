import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracerFileComponent } from './tracer-file.component';

describe('TracerFileComponent', () => {
  let component: TracerFileComponent;
  let fixture: ComponentFixture<TracerFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracerFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
