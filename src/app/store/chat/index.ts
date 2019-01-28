import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

import { chatsReducer } from './reducers/chat-list.reducer';
import { ChatListState } from '../../models/chat';
import { ChatListEffects } from './effects/chat-list.effect'

// Le root reducer
const reducers = {
    chat: chatsReducer
};

export interface AppState {
    chat: ChatListState;
}
// Nécéssaire pour l'AOT
export function getReducers() {
    return reducers;
}
// Nécéssaire pour l'AOT
export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

export  const  appEffects = [ChatListEffects]; 