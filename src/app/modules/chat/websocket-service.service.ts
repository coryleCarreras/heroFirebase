import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../../environments/environment';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket: SocketIOClient.Socket;

  constructor() {
    // Connect to socket.io server
    this.socket = io(environment.ws_url);
  }

  /**
   * Register a new socket.io event/emit interface
   *
   * @param {string} event
   *
   * @returns {Subject<MessageEvent>}
   */
  event(event: string): Subject<MessageEvent> {
    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = this.on(event);

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
      next: (data: Object) => {
        this.emit(event, data);
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }

  /**
   * Subscribe to an event from socket.io server
   *
   * @param event {string}
   *
   * @returns {Observable<any>}
   */
  on(event): Observable<any> {
    return new Observable(observer => {
      // Add an event listener
      this.socket.on(event, (data) => {
        observer.next(data);
        console.log(event) // chatMessage
        console.log(data)  // hh:mm:ss by xxxx : ****
      });

      // If we unsubscribe this, drop this event listener
      return () => {
        this.socket.off(event);
      };
    });
  }

  /**
   * Emit data to socket.io event
   *
   * @param event {string}
   * @param data {any}
   */
  emit(event, data): void {
    this.socket.emit(event, data);
  }

}
