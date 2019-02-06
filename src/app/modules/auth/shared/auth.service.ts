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
  
  /**
  * Creates a new instance of AuthService
  * @router the route handling service
  */
  constructor(private router: Router) { 
  }

  /**
  * Creates a new instance of AuthService
  * @email the email provided by user
  * @password the password provided by user
  */
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

  /**
   * Gets the current logged in user id and stores it locally, or store a "NO USER LOGGED IN" instead
   */
  getUser(){
    var user = firebase.auth().currentUser;
    // console.log(user);
    if (user) {
      this.uid = user.uid;
    } else {
      this.uid = "NO USER LOGGED IN";
    } 
  }

  /**
   * Calls getUser and then returns the id it has stored
   */
  getUid(){
    this.getUser();
    return this.uid;
  }

  /**
   * Creates the newly created user main informations in database (not the login one) then redirect to hero form view
   */
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

  /**
   * Saves the user credentials stored in addUser()
   */
  createNewUser(newHero: Account){
    this.accounts.unshift(newHero);
    this.accounts.splice(1, (this.accounts.length-1));
    this.saveUser(this.getUid());
  }

  /**
   * Saves the user credentials in database
   */
  saveUser(uid: string){
    firebase.database().ref('user/'+uid+'/').set(this.accounts);
  }

  /**
   * Log in the current user with credentials it provided
   * @email the email provided
   * @password the password provided
   */
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

  /**
   * Log out the current user logged in
   */
  signOutUser() {
    firebase.auth().signOut();
  }
}
