import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationMigrationComponent } from './configuration-migration.component';

describe('ConfigurationMigrationComponent', () => {
  let component: ConfigurationMigrationComponent;
  let fixture: ComponentFixture<ConfigurationMigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationMigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
