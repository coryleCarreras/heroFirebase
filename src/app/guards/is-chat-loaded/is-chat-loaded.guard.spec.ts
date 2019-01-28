import { TestBed, async, inject } from '@angular/core/testing';

import { IsChatLoadedGuard } from './is-chat-loaded.guard';

describe('IsChatLoadedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsChatLoadedGuard]
    });
  });

  it('should ...', inject([IsChatLoadedGuard], (guard: IsChatLoadedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
