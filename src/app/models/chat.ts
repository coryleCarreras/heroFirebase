// Interface de la todo
export class Chat {
	name: string;
	content: string;
	date: string;

	constructor(name: string, content: string, date: string){
		this.name = name
		this.content = content
		this.date = date
	}
}

// Interface de notre futur state de todos
export interface ChatListState {
	data: Chat[];
	loading: boolean;
	loaded: boolean;
}