import { createSelector } from  '@ngrx/store';
import { AppState } from '..';

// La première fonction amène vers le state chats
export const selectChatListState$ = (state: AppState) =>  state.chat;

// Et à partir de celle-ci, on créer une autre fonction qui renverra data
export const selectChats$ = createSelector(selectChatListState$,(chats) =>  chats.data);