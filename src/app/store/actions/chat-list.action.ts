export namespace ChatListModule {

    export enum ActionTypes {
        INIT_CHAT = '[chatList] Init Chat'
    }

    export class InitChat {
        readonly type = ActionTypes.INIT_CHAT;
    }

    export type Actions = InitChat;
}