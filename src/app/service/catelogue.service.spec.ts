import {getTestBed, TestBed} from '@angular/core/testing';

import { CatelogueService } from './catelogue.service';

describe('CatelogueService', () => {
  let service: CatelogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatelogueService);
  });

  it('should be created', () => {
    const service :CatelogueService = TestBed.get(CatelogueService)
    expect(service).toBeTruthy();
  });
});
