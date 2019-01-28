import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from '@Models/chat';
import { environment } from '@Env/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {

  constructor(private http: HttpClient) {
  }

  createChat(body): Observable<Chat> {
    return this.http.post<Chat>(`${environment.apiUrl}/chats`, body);
  }
  
  getChats(): Observable<Chat[]>{
    return this.http.get<Chat[]>(`${environment.apiUrl}/chats`);
  }
}
