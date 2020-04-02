import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonMetadataApiComponent } from './json-metadata-api.component';

describe('JsonMetadataApiComponent', () => {
  let component: JsonMetadataApiComponent;
  let fixture: ComponentFixture<JsonMetadataApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonMetadataApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonMetadataApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
