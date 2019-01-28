import { ChatListModule } from '../actions/chat-list.action';
import { ChatListState  } from '../../../models/chat';
//import { ChatMock } from '../../mocks/chat-list';

// les valeurs par défaut du state
const initialState: ChatListState = {
    data: [],
    loading: false,
    loaded: false,
    selectChat: undefined
};

// la fonction reducer de la chat
export function chatsReducer(state: ChatListState = initialState, action: ChatListModule.Actions): ChatListState {

    switch (action.type) {
        // L'action de Initchats
        case ChatListModule.ActionTypes.LOAD_INIT_CHATS :
        return {
            ...state,
            loading: true
        };
        case ChatListModule.ActionTypes.SUCCESS_INIT_CHATS:
	        // Bind state.data avec les Chats du server
	        // Passe le loaded a true et le loading a false
	        return {
	        	...state,
	        	loading: false,
	        	loaded: true,
	        	data: action.payload
	        };

        case ChatListModule.ActionTypes.ERROR_INIT_CHATS:
	        // Error rend le loading a false
	        return {
	        	...state,
	        	loading: false
            };
        case ChatListModule.ActionTypes.LOAD_CREATE_CHAT:
            // Passe le loading a true
            return {
                ...state,
                loading: true
            };
    
        case ChatListModule.ActionTypes.SUCCESS_CREATE_CHAT:
            // Passe le loading a false et ajoute un chat
            return {
                ...state,
                loading: false,
                data: [
                    ...state.data,
                    action.payload
                ]
            };
    
        case ChatListModule.ActionTypes.ERROR_CREATE_CHAT:
            // Passe le loading a false
            return {
                ...state,
                loading: false
            };

        case ChatListModule.ActionTypes.DELETE_CHAT:
            return{
                ...state,
                data: state.data.filter(chat => chat.id !== action.payload)
            };

        case ChatListModule.ActionTypes.SELECT_CHAT:
            return{
                ...state,
                selectChat: action.payload
            };
            
        case ChatListModule.ActionTypes.UPDATE_CHAT:
            return{
                ...state,
                data: state.data.map(chat => action.payload.id === chat.id ? action.payload: chat)
            };
        
    default:
        return state;
    }
}