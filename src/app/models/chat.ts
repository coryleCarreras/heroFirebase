export class Chat {
	name: string;
	content: string;
	date: string;

	/**
	 * Creates a new instance of Chat
	 * @name the user name that sent the message
	 * @content the content (what it typed)
	 * @date the full date and hour at which it sent
	 */
	constructor(name: string, content: string, date: string){
		this.name = name
		this.content = content
		this.date = date
	}
}

export interface ChatListState {
	data: Chat[];
	loading: boolean;
	loaded: boolean;
}