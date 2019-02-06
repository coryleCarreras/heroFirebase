import { Component, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database/interfaces';

import * as firebase from 'firebase/app';
import 'firebase/database';

import { FriendService } from '../heroes/shared/friend.service';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendListComponent implements OnInit {
  uid = ''
  pendingFriends = []

  /**
  * Creates a new instance of FriendListComponent
  * @friendService the friend handling service
  * @authService the session information service
  * @router the route handling service
  */
  constructor(private friendService: FriendService, private authService: AuthService, private router:Router) { }

  /**
  * Gets the pending friend request on database for currently logged in hero
  */
  ngOnInit() {
    this.uid = this.authService.getUid();
    this.getFriendRequest().then((s: string) =>{
      if(s != null){
        this.pendingFriends = s.split(';');
      }else this.pendingFriends.push('');
    });
  }

  /**
  * Accepts a pending request between two heroes and makes friendship mutual
  * @idf the hero id accepted
  */
  confirmFriend(idf){
    this.friendService.deletePendingFriend(idf, this.uid)
    this.friendService.deletePendingFriend(this.uid, idf)
    this.friendService.addFriend(idf, this.uid);
    this.friendService.addFriend(this.uid, idf);
  }

  /**
  * Gets the pending request on database 
  */
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

  /**
  * Deny a friendship relation between currently logged in hero and id's one
  * @id the denied hero id
  */
  denyFriend(id){
    this.friendService.deletePendingFriend(this.uid, id)
  }

  /**
  * Redirects to hero detail view
  * @f the to-be-seen hero id
  */
  onViewHero(f){
    this.router.navigate(['detail', f]);
  }
}
