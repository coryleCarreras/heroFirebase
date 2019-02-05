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
  progFr= []
  friendsSubject = new Subject<string>();

  constructor(private authService: AuthService){
    this.uid = this.authService.getUid();
    this.friends = '';
  }

  // ajoute idto à la liste d'ami de idfrom si il n'y est pas déjà (vire les doublons)
  addFriend(idTo: string, idFrom: string){
    this.getFriends().then((s: string) =>{
      this.friends = s ;
      //console.log(this.friends)
      var tab = []
      if(this.friends == null || this.friends == undefined || this.friends == '' || this.friends == ""){
        this.friends = idTo;
        console.log(this.friends)
      }else{
        tab = this.friends.split(';')
        for (let i = 0; i < tab.length-1; i++) {
          if(tab[i] == idTo){
            tab.splice(i, 1);
          }
        }
        this.friends = tab.join(';');
        console.log(this.friends)
      }
      this.saveFriends(idFrom);
      this.emitFriends();
    });
  }
  
  emitFriends(){   
    this.friendsSubject.next(this.friends);
  }

  saveFriends(uid?: string){ 
    if(uid != null){
      firebase.database().ref('friends/'+uid).set(this.friends);
    }else{
      firebase.database().ref('friends/'+this.uid).set(this.friends);
    }
  }

  getFriends(uid?:string){
    //console.log(uid);
    if(!uid){
      this.uid = this.authService.getUid();
    }else{
      this.uid = uid
    }
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/friends/'+this.uid).once('value').then((data:DataSnapshot)=> {
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

  // delete idf from idf
  deleteFriend(idf, ids){
    this.getFriends(idf).then((s: string) =>{
      //console.log("before : "+s);
      var tab = s.split(';')
      for( var i = 0; i < tab.length-1; i++){ 
        if ( tab[i] == ids) {
          tab.splice(i, 1); 
        }
      }
      var frf = tab.join(';')
      this.friends = frf ;
      this.saveFriends(idf);
    });
  }

  sendRequest(idTo: string, idFrom: string){
    var nList = ''
    // ajouter idto à la liste de idfrom
    this.getPendingFriends(idTo).then((s: string) =>{
      this.friends = s ;
      if(this.friends != null && this.friends != '') {
        this.progFr = this.friends.split(';')
        this.progFr.push(idFrom)
        nList = this.progFr.join(';')
      }else{
        nList = idFrom;
      }
      firebase.database().ref('friendRequest/'+idTo).set(nList);
    });
    
    // ajouter idfrom à la liste de idto
    this.getPendingFriends(idFrom).then((s: string) =>{
      this.friends = s ;
      if(this.friends != null && this.friends != '') {
        this.progFr = this.friends.split(';')
        this.progFr.push(idTo)
        nList = this.progFr.join(';')
      }else{
        nList = idTo;
      }
      firebase.database().ref('friendRequest/'+idFrom).set(nList);
    });
  }

  getPendingFriends(id){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/friendRequest/'+id).once('value').then((data:DataSnapshot)=> {
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

  deletePendingFriend(idFrom, idTo){
    var nList = ''
    // ajouter idto à la liste de idfrom
    this.getPendingFriends(idTo).then((s: string) =>{
      if(s != null && tab != [''] && tab != [""]){
        var tab = s.split(';')
        // console.log(tab)
        if(tab.length == 1){
          nList = '';
        }else {
          for( var i = 0; i < tab.length-1; i++){ 
            if ( tab[i] == idFrom) {
              tab.splice(i, 1); 
            }
          }
          nList = tab.join(';')
        }
        firebase.database().ref('friendRequest/'+idTo).set(nList);
      }
    });

    // ajouter idto à la liste de idfrom
    this.getPendingFriends(idFrom).then((s: string) =>{
      var tab = s.split(';')
      // console.log(tab)
      if(tab.length == 1){
        nList = '';
      }else {
        for( var i = 0; i < tab.length-1; i++){ 
          if ( tab[i] == idTo) {
            tab.splice(i, 1); 
          }
        }
        nList = tab.join(';')
      }
      
      firebase.database().ref('friendRequest/'+idFrom).set(nList);
    });
  }
}
