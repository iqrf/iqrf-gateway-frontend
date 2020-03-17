import { TestBed } from '@angular/core/testing';

import { HttpMsgsService } from './http-msgs.service';

describe('HttpMsgsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpMsgsService = TestBed.get(HttpMsgsService);
    expect(service).toBeTruthy();
  });
});
