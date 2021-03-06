import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import 'rxjs/operators/share';

import { WebsocketService } from './websocket-service.service';
import { AuthService } from '../auth/shared/auth.service';
import { HeroService } from '../heroes/shared/hero.service';
import { Hero } from '../heroes/shared/hero';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatStorm = []
  public chatForm: FormGroup;
  heroInf = [];

  chat: Subject<any>;
  received: Subscription

  constructor(@Inject(FormBuilder) private fb: FormBuilder, private authService: AuthService, 
              private heroService: HeroService, private chatService: WebsocketService) {

    this.chatForm = fb.group({
        content: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Se lie à l'event chatMessage pour envoyer et recevoir des messages
    this.chat = this.chatService.event("chatMessage"); 

    // se lie à l'evenement qui envoie les messages (donc ici c'est pour recevoir les messages du serveur)
    this.chat.subscribe(this.displayChat.bind(this))  
  } 

  sendMessage(){
    if(this.chatForm.getRawValue().content != null){
      var idh = this.authService.getUid();
      var m = new Date();
      var dateString = m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
      
      this.heroService.getSingleHero(idh).then((hero: Hero) =>{
        this.heroInf.unshift(hero);

        /***  SEND MESSAGE SO SOCKET.IO SOCKET SERVICE  ***/
        this.chat.next({date: dateString, name: this.heroInf[0].name, content: this.chatForm.getRawValue().content});
        
        this.chatForm.reset();
        this.heroInf.splice(1, (this.heroInf.length-1));

      });
    }
  }

  displayChat(data){
      // console.log(data);

      // insère les données du message dans le tableau pour qu'ils soient affichés dans la vue
      this.chatStorm.push(data);
  }
}
