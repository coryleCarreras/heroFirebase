import { TestBed, async, inject } from '@angular/core/testing';

import { CanCreateHeroGuard } from './can-create-hero.guard';

describe('CanCreateHeroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanCreateHeroGuard]
    });
  });

  it('should ...', inject([CanCreateHeroGuard], (guard: CanCreateHeroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
