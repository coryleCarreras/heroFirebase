import { Component, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database/interfaces';

import * as firebase from 'firebase/app';
import 'firebase/database';

import { FriendService } from '../heroes/shared/friend.service';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendListComponent implements OnInit {
  uid = ''
  pendingFriends = []

  constructor(private friendService: FriendService, private authService: AuthService) { }

  ngOnInit() {
    this.uid = this.authService.getUid();
    this.getFriendRequest().then((s: string) =>{
      if(s != null){
        this.pendingFriends = s.split(';');
      }else this.pendingFriends.push('');
    });

  }

  confirmFriend(idf){
    this.friendService.deletePendingFriend(idf, this.uid)
    this.friendService.addFriend(idf, this.uid);
    this.friendService.addFriend(this.uid, idf);
  }

  getFriendRequest(){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/friendRequest/'+this.uid).once('value').then((data:DataSnapshot)=> {
                //console.log(data.val());
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

  denyFriend(id){
    this.friendService.deletePendingFriend(this.uid, id)
  }
}
