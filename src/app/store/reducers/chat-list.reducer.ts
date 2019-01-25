import { ChatListModule } from '../actions/chat-list.action';
import { ChatListState  } from '../../models/chat';
import { ChatMock } from '../../mocks/chat-list';

// les valeurs par défaut du state
const initialState: ChatListState = {
    data: [],
    loading: false,
    loaded: false
};

// la fonction reducer de la chat
export function chatReducer(state: ChatListState = initialState, action: ChatListModule.Actions): ChatListState {
  switch (action.type) {
    // L'action de Initchats
    case ChatListModule.ActionTypes.INIT_CHAT :
    return {
        ...state,
        data: [
            ...ChatMock // Injecte le mock
        ]
    };

    default:
        return state;
    }
}