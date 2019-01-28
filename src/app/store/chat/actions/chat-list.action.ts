import { Chat } from 'app/models/chat';

export namespace ChatListModule {

    export enum ActionTypes {
        LOAD_INIT_CHATS = '[chatList] Load Init Chats',
        SUCCESS_INIT_CHATS = '[chatList] Success Init Chats',
        ERROR_INIT_CHATS = '[chatList] Error Init Chats',
        LOAD_CREATE_CHAT = '[ChatList] Load Create Chat',
        SUCCESS_CREATE_CHAT = '[ChatList] Success Create Chat',
        ERROR_CREATE_CHAT = '[ChatList] Error Create Chat',
		DELETE_CHAT = '[chatList] Delete Chat',
		SELECT_CHAT = '[chatList] Select Chat',
		UPDATE_CHAT = '[chatList] Update Chat'
    }

    export  class  LoadInitChats {
        readonly  type = ActionTypes.LOAD_INIT_CHATS;
    }
    
    export  class  SuccessInitChats {
        readonly  type = ActionTypes.SUCCESS_INIT_CHATS;
        constructor(public payload: Chat[]){}
    }
    
    export  class  ErrorInitChats {
        readonly  type = ActionTypes.ERROR_INIT_CHATS
    }

    export class LoadCreateChat {
        readonly type = ActionTypes.LOAD_CREATE_CHAT;
        constructor(public payload: Chat) {}
    }

    export class SuccessCreateChat {
        readonly type = ActionTypes.SUCCESS_CREATE_CHAT;
        constructor(public payload: Chat) {}
    }
    
    export class ErrorCreateChat {
        readonly type = ActionTypes.ERROR_CREATE_CHAT;
    }

    export class DeleteChat {
        readonly type = ActionTypes.DELETE_CHAT;
        constructor(public payload: string){}
    }

    export class SelectChat {
        readonly type = ActionTypes.SELECT_CHAT;
        constructor(public payload: Chat){}
    }

    export class UpdateChat {
        readonly type = ActionTypes.UPDATE_CHAT;
        constructor(public payload: Chat){}
    }

    export type Actions = LoadInitChats | SuccessInitChats | ErrorInitChats | LoadCreateChat | SuccessCreateChat | ErrorCreateChat | DeleteChat | SelectChat | UpdateChat;
}