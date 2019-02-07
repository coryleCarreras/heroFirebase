import { Injectable } from '@angular/core';

import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Subject } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { AuthService } from '../../auth/shared/auth.service';
import { promise } from 'protractor';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  uid: string;
  friends: string
  progFr= []
  friendsSubject = new Subject<string>();

  /**
  * Creates a new instance of FriendService and sets this.uid to currently logged in user
  * @authService the session information service
  */
  constructor(private authService: AuthService){
    this.uid = this.authService.getUid();
    this.friends = '';
  }

  /**
   * 
   * @id thid hero id to check if current user is friend with 
   */
  isFriend(id: string): Promise<boolean>{   
    return new Promise(
      (resolve, reject) => {
        this.getFriends(this.authService.getUid()).then((data: any) =>{
            //console.log(data);
              var friendTab = []
              if(data != '' && data != null){
                friendTab = data.split(';');
                for (let i = 0; i < friendTab.length; i++) {
                  if(id == friendTab[i]){
                    resolve(true);
                  }
                }
              }
              resolve(false);
            }, (error) =>{
                console.log(error.code);
                console.log(error.message);
                reject(error);
            }
        );
      }
    );
    // this.getFriends(this.authService.getUid()).then((data: any) =>{
    //   var friendTab = []
    //   if(data != '' && data != null){
    //     friendTab = data.split(';');
    //     for (let i = 0; i < friendTab.length; i++) {
    //       if(id == friendTab[i]){
    //         return true
    //       }
    //     }
    //   }
    //   return false  
    // }
  }

  /**
  * Add friend to a hero. calls the saveFriend() method to add. Call this method twice by inverting parameters to make friendship mutual
  * @idTo the Hero id that will become friend
  * @idFrom the Hero id that responded the request.
  */
  addFriend(idTo: string, idFrom: string){
    this.friends = "";
    this.getFriends(idFrom).then((s: string) =>{
      this.friends = s ;
      //console.log(this.friends)
      var tab = []
      if(this.friends == null || this.friends == undefined || this.friends == '' || this.friends == ""){
        this.friends = idTo;
        //console.log(this.friends)
      }else{
        tab = this.friends.split(';')
        for (let i = tab.length-1; i >= 0 ; i--) {
          if(tab[i] == idTo){
            tab.splice(i, 1);
          }
        }
        tab.push(idTo);
        this.friends = tab.join(';');
        // console.log(this.friends)
      }
      this.saveFriends(idFrom);
      this.emitFriends();
    });
  }
  
  emitFriends(){   
    this.friendsSubject.next(this.friends);
  }

  /**
  * Add friendship between heroes.
  * @uid the Hero id that will become friend. If not precised, will be currently logged in user
  */
  saveFriends(uid?: string){ 
    if(uid != null){
      firebase.database().ref('friends/'+uid).set(this.friends);
    }else{
      firebase.database().ref('friends/'+this.uid).set(this.friends);
    }
  }

  /**
  * Get all friends from the currently logged in user.
  * Returns a promise containing an array of hero.idUser seperated by ';' character, or an error
  * @uid the Hero id to retrieve friend from
  */
  getFriends(uid?:string): Promise<string>{
    //console.log(uid);
    if(!uid){
      this.uid = this.authService.getUid();
    }else{
      this.uid = uid
    }
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/friends/'+this.uid).once('value').then((data:DataSnapshot)=> {
                //console.log(data);
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
  * Delete friendship between two heroes.
  * @idF the Hero that wants to remove friendship
  * @ids the Hero that is removed from friendship
  */
  deleteFriend(idf, ids){
    var tab = [] ;
    var frf = '';
    this.getFriends(idf).then((s: string) =>{
      tab = s.split(';')
      if(tab.length > 1) {
        console.log(tab)
        for( var i = tab.length-1; i >= 0 ; i--){ 
          if ( tab[i] == ids) {
            tab.splice(i, 1); 
          }
        }
        frf = tab.join(';')
      }else{
        frf = '';
      }
      this.friends = frf ;
      this.saveFriends(idf);
    });
  }

  /**
  * Send a friendship request between two heroes.
  * @idTo the Hero that receives friendship proposal
  * @idFrom the Hero that sends friendship proposal
  */
  sendRequest(idTo: string, idFrom: string){
    var nList = ''
    this.getPendingFriends(idTo).then((s: string) =>{
      this.friends = s ;
      if(this.friends != null && this.friends != '') {
        this.progFr = this.friends.split(';')
        for( var i = this.progFr.length-1; i >= 0; i--){
          if ( this.progFr[i] == idFrom) {
            this.progFr.splice(i, 1); 
          }
        }
        this.progFr.push(idFrom)
        nList = this.progFr.join(';')
      }else{
        nList = idFrom;
      }
      firebase.database().ref('friendRequest/'+idTo).set(nList);
    });
  }

  /**
  * Get the list of all waiting-to-be-friend heroes.
  * @id the Hero that is currently logged in
  */
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

  /**
  * Deletes a hero from friendship-waiting-list of the logged in user on both sides.
  * @idFrom the Hero that deny friendship proposal
  * @idTo the Hero that has been denied friendship proposal
  */
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
          for( var i = tab.length-1; i >= 0; i--){ 
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
        for( var i = tab.length-1; i >= 0 ; i--){ 
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
