import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  user: firebase.User 

  /**
  * Creates a new instance of HeaderComponent
  * @authService the session information service
  */
  constructor(private authService: AuthService) { }

  /**
  * Checks if the current user is logged in
  */
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  /**
  * Signout the currently logged in user
  */
  onSignOut() {
    this.authService.signOutUser();
  }

}
