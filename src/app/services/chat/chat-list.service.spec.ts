import { TestBed } from '@angular/core/testing';

import { ChatListService } from './chat-list.service';

describe('ChatListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatListService = TestBed.get(ChatListService);
    expect(service).toBeTruthy();
  });
});
