import { Chat } from 'src/app/models/chat';

export namespace ChatListModule {

    export enum ActionTypes {
        INIT_CHAT = '[chatList] Init Chat',
		CREATE_CHAT = '[chatList] Create Chat',
    }

    export class InitChat {
        readonly type = ActionTypes.INIT_CHAT;
    }

    export class CreateChat {
        readonly type = ActionTypes.CREATE_CHAT;
        constructor(public payload: Chat){

        }
    }

    export type Actions = InitChat | CreateChat;
}