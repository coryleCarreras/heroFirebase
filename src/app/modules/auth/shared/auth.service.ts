import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Account } from './account';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  accounts: Account[] = [];
  heroesSubject = new Subject<Account[]>();
  private uid: string ;
  
  constructor(private router: Router) { 
  }

  createUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            this.addUser(email);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getUser(){
    var user = firebase.auth().currentUser;
    // console.log(user);
    if (user) {
      this.uid = user.uid;
    } else {
      this.uid = "NO USER LOGGED IN";
    } 
  }

  getUid(){
    this.getUser();
    return this.uid;
  }

  addUser(email: string){
    if(this.getUid() != "NO USER LOGGED IN"){
      var m = new Date();
      var date = m.getDate()+'/'+ (m.getMonth()+1)+'/'+m.getFullYear()+' '+m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
      const newUser = new Account(email, this.getUid(), date);
      console.log(newUser);
      this.createNewUser(newUser);
      this.router.navigate(['form']);
    }
  }

  createNewUser(newHero: Account){
    this.accounts.unshift(newHero);
    this.accounts.splice(1, (this.accounts.length-1));
    this.saveUser(this.getUid());
  }

  saveUser(uid: string){
    firebase.database().ref('user/'+uid+'/').set(this.accounts);
  }

  logIn(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
