import { TestBed, inject } from '@angular/core/testing';

import { FakeBackendProviderService } from './fake-backend-provider.service';

describe('FakeBackendProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeBackendProviderService]
    });
  });

  it('should be created', inject([FakeBackendProviderService], (service: FakeBackendProviderService) => {
    expect(service).toBeTruthy();
  }));
});
