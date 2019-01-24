import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {apiKey: "AIzaSyBt4qiZEj7soWOFuU5FgHNFTf8JGGrGLzs", authDomain: "heroproj-f4228.firebaseapp.com", databaseURL: "https://heroproj-f4228.firebaseio.com",
                projectId: "heroproj-f4228", storageBucket: "heroproj-f4228.appspot.com", messagingSenderId: "739594881383" }
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heroFirebase';
}
