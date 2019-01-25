import { Component, OnInit, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { ChatListModule } from './../../store/actions/chat-list.action';
import { AppState } from './../../store';
import { Chat } from './../../models/chat';
import { Store } from '@ngrx/store';
import { selectChats$ } from  '../../store/selectors/chat-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat$: Observable<any>;
  public  chatForm: FormGroup;

  constructor(private store: Store<AppState>, @Inject(FormBuilder) fb: FormBuilder, private route: ActivatedRoute){
    this.chat$ = this.store.select(selectChats$);
    this.chatForm = fb.group({
        content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.dispatch(new ChatListModule.InitChat());
  }

  sendMessage(chat: Chat){
    const idh = this.route.snapshot.params['idhero'];

    var m = new Date();
    var dateString = m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

    const payload = {
      ...chat,
      userId: idh,
      date: dateString,
    };
    console.log(payload);
    this.store.dispatch(new ChatListModule.CreateChat(payload));

    this.chatForm.reset();
  }
}
