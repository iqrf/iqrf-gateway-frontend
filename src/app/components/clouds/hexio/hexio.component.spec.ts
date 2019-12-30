import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexioComponent } from './hexio.component';

describe('HexioComponent', () => {
  let component: HexioComponent;
  let fixture: ComponentFixture<HexioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
