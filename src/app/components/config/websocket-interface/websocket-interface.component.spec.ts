import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketInterfaceComponent } from './websocket-interface.component';

describe('WebsocketInterfaceComponent', () => {
  let component: WebsocketInterfaceComponent;
  let fixture: ComponentFixture<WebsocketInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsocketInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsocketInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
