import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqrfRepositoryComponent } from './iqrf-repository.component';

describe('IqrfRepositoryComponent', () => {
  let component: IqrfRepositoryComponent;
  let fixture: ComponentFixture<IqrfRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqrfRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqrfRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
