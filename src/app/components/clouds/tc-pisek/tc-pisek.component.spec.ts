import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcPisekComponent } from './tc-pisek.component';

describe('TcPisekComponent', () => {
  let component: TcPisekComponent;
  let fixture: ComponentFixture<TcPisekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcPisekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcPisekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
