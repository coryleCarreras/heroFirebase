import { Chat } from 'app/models/chat';
import { HttpErrorResponse } from '@angular/common/http';

export namespace ChatListModule {

    export enum ActionTypes {
        LOAD_INIT_CHATS = '[chatList] Load Init Chats',
        SUCCESS_INIT_CHATS = '[chatList] Success Init Chats',
        LOAD_CREATE_CHAT = '[ChatList] Load Create Chat',
        SUCCESS_CREATE_CHAT = '[ChatList] Success Create Chat',
		DELETE_CHAT = '[chatList] Delete Chat',
		SELECT_CHAT = '[chatList] Select Chat',
        LOAD_UPDATE_CHAT = '[ChatList] Load Update Chat',
        SUCCESS_UPDATE_CHAT = '[ChatList] Success Update Chat',
        ERROR_LOAD_ACTION = '[ChatList] Error Load Action'
    }

    export  class  LoadInitChats {
        readonly  type = ActionTypes.LOAD_INIT_CHATS;
    }
    
    export  class  SuccessInitChats {
        readonly  type = ActionTypes.SUCCESS_INIT_CHATS;
        constructor(public payload: Chat[]){}
    }
    
    export class LoadCreateChat {
        readonly type = ActionTypes.LOAD_CREATE_CHAT;
        constructor(public payload: Chat) {}
    }

    export class SuccessCreateChat {
        readonly type = ActionTypes.SUCCESS_CREATE_CHAT;
        constructor(public payload: Chat) {}
    }
    
    export class DeleteChat {
        readonly type = ActionTypes.DELETE_CHAT;
        constructor(public payload: string){}
    }

    export class SelectChat {
        readonly type = ActionTypes.SELECT_CHAT;
        constructor(public payload: Chat){}
    }

    export class LoadUpdateChat {
        readonly type = ActionTypes.LOAD_UPDATE_CHAT;
        constructor(public payload: Chat){}
    }

    export class SuccessUpdateChat {
        readonly type = ActionTypes.SUCCESS_UPDATE_CHAT;
        constructor(public payload: Chat){}
    }

    export class ErrorLoadAction {
        readonly type = ActionTypes.ERROR_LOAD_ACTION;
        constructor(public payload: HttpErrorResponse) {}
    }

    export type Actions = LoadInitChats | SuccessInitChats |  LoadCreateChat | SuccessCreateChat |  DeleteChat | SelectChat | LoadUpdateChat | SuccessUpdateChat | ErrorLoadAction }