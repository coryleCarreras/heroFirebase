import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

import { chatReducer } from './reducers/chat-list.reducer';
import { ChatListState } from '../models/chat';

// Le root reducer
const reducers = {
    chat: chatReducer
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