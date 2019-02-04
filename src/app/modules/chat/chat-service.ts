import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ng-socket-io';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/operators/share';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy{

  constructor(private socket: Socket) { }

  sendMessage(date: string, msg:string, name: string){
    console.log([date, msg, name]);
    this.socket.emit("chatMessage", [date, msg, name]);
  }

  getMessage(){
    return this.socket.fromEvent<any>("chatMessage").map(data => [data[0], data[1], data[2]]);
  }

  ngOnDestroy(){
    this.socket.disconnect();
  }
}
