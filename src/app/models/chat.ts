// Interface de la todo
export interface Chat {
    heroName: string;
	userId: string;
	id: number;
	content: string;
	date: string;
}

// Interface de notre futur state de todos
export interface ChatListState {
	data: Chat[];
	loading: boolean;
	loaded: boolean;
}