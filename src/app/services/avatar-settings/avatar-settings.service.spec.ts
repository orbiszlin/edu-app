import { TestBed } from '@angular/core/testing';

import { AvatarSettingsService } from './avatar-settings.service';

describe('AsdfService', () => {
  let service: AvatarSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
