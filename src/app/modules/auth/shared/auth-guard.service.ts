import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router) { }

  /**
   * Checks if a user is actually logged in and returns a promise containing a boolean
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
