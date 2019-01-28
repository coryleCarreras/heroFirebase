import { Component, OnInit, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { ChatListModule } from './../../store/chat/actions/chat-list.action';
import { AppState } from '../../store/chat';
import { Chat } from './../../models/chat';
import { Store } from '@ngrx/store';
import { selectChats$, selectChatsLoading$ } from  '../../store/chat/selectors/chat-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { AuthService } from '../auth/shared/auth.service';
// import { ChatListService } from '@Services/chat-list.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat$: Observable<any>;
  public  chatForm: FormGroup;

  public chatsLoading: Observable<boolean>;
  

  constructor(private store: Store<AppState>, @Inject(FormBuilder) fb: FormBuilder, private route: ActivatedRoute, 
              private router: Router, private auth: AuthService, /*private chatListService: ChatListService*/){
    this.chat$ = this.store.select(selectChats$);

    this.chatForm = fb.group({
        content: ['', Validators.required]
    });
    this.chatsLoading = this.store.select(selectChatsLoading$);
  }

  ngOnInit() {
    // this.chatListService.getChats().subscribe((chats) =>{
    //     this.store.dispatch(new ChatListModule.LoadInitChats());
    // })
    this.store.dispatch(new ChatListModule.LoadInitChats())
  }

  sendMessage(chat: Chat){
    const idP = this.auth.getUid();

    var m = new Date();
    var dateString = m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

    const payload = {
      ...chat,
      userId: idP,
      //id: UUID.UUID(),
      date: dateString,
    };
    console.log(payload);
    this.store.dispatch(new ChatListModule.LoadCreateChat(payload));

    this.chatForm.reset();
  }

  deleteChat(id: string) {
    this.store.dispatch(new ChatListModule.DeleteChat(id));
  }

  selectChat(chat){
    this.store.dispatch(new ChatListModule.SelectChat(chat));
    this.router.navigate(['/chat-list/select-chat']);
  }
}
