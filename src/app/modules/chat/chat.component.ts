import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ChatListModule } from './../../store/actions/chat-list.action';
import { AppState } from './../../store';
import { Chat } from './../../models/chat';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat$: Observable<any>;

  constructor(private store: Store<AppState>){
    this.chat$ = this.store.select('chat');
  }

  ngOnInit() {
    this.store.dispatch(new ChatListModule.InitChat());
  }

}
