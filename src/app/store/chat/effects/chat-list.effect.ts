import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ChatListModule } from '../actions/chat-list.action';
import { ChatListService } from '@Modules/chat/services/chat-list.service';
import { Actions, Effect, ofType } from '@NGRX/effects';
import { catchError, map, switchMap } from 'rxjs/operators'

@Injectable()
export class ChatListEffects{

    @Effect() LoadChats$: Observable<ChatListModule.Actions> = this.actions$.pipe(
        // action = LOAD_INI_CHATS
        ofType(ChatListModule.ActionTypes.LOAD_INIT_CHATS),

        // action = { type: '[chatList] load init Chats'}
        switchMap(action => this.chatListService.getChats()),

        map(chats => new ChatListModule.SuccessInitChats(chats))/*,

        catchError(() => new ChatListModule.ErrorInitChats())*/
    );

    @Effect() LoadCreateChat$: Observable<ChatListModule.Actions> = this.actions$.pipe(
        ofType<ChatListModule.LoadCreateChat>(ChatListModule.ActionTypes.LOAD_CREATE_CHAT),
        switchMap(action => this.chatListService.createChat(action.payload)),
        map(chat => new ChatListModule.SuccessCreateChat(chat)),
        //catchError(() => of(new ChatListModule.ErrorInitChats()))
    );

    constructor(private chatListService: ChatListService, private actions$: Actions){

    }
}