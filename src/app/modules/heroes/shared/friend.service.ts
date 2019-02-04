import { Injectable } from '@angular/core';

import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Hero } from './hero';
import { Subject } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { AuthService } from '../../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  uid: string;
  friends: string
  friendsSubject = new Subject<string>();

  constructor(private authService: AuthService){
    this.friends = '';
    this.getFriends().then((s: string) =>{
      this.friends = s ;
    });
  }

  addFriend(idTo: string, idFrom: string){
    console.log(this.friends)
    if(this.friends == null){
      this.friends = idTo+';';
    }else{
      this.friends += idTo+';'
    }
    this.saveFriends(idFrom);
    this.emitFriends();
  }

  emitFriends(){   
    this.friendsSubject.next(this.friends);
  }

  saveFriends(uid: string){ 
    firebase.database().ref('friends/'+uid).set(this.friends);
  }

  getFriends(){
    this.uid = this.authService.getUid();
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/friends/'+this.uid).once('value').then((data:DataSnapshot)=> {
                console.log(data.val());
                resolve(data.val());
            }, (error) =>{
                console.log(error.code);
                console.log(error.message);
                reject(error);
            }
        );
      }
    );
  }
}
