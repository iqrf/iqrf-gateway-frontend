import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrUploadComponent } from './tr-upload.component';

describe('TrUploadComponent', () => {
  let component: TrUploadComponent;
  let fixture: ComponentFixture<TrUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
