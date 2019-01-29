import { Component, OnInit, Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Chat } from './../../models/chat';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat$: Observable<any>;
  public  chatForm: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private route: ActivatedRoute){
    this.chatForm = fb.group({
        content: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  sendMessage(chat: Chat){
    const idh = this.route.snapshot.params['idhero'];

    var m = new Date();
    var dateString = m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

    const payload = {
      ...chat,
      userId: idh,
      date: dateString,
    };
    console.log(payload);

    this.chatForm.reset();
  }
}
