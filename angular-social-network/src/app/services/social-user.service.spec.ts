import { TestBed, inject } from '@angular/core/testing';

import { SocialUserService } from './social-user.service';

describe('SocialUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialUserService]
    });
  });

  it('should be created', inject([SocialUserService], (service: SocialUserService) => {
    expect(service).toBeTruthy();
  }));
});
