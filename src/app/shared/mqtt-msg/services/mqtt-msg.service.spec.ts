import { TestBed } from '@angular/core/testing';

import { MqttMsgService } from './mqtt-msg.service';

describe('MqttMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MqttMsgService = TestBed.get(MqttMsgService);
    expect(service).toBeTruthy();
  });
});
