import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HeaderComponent } from './modules/header/header.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthService } from './modules/auth/shared/auth.service';
import { AuthGuardService } from './modules/auth/shared/auth-guard.service';
import { SignupComponent } from './modules/auth/signup/signup.component';

import { HeroesListComponent } from './modules/heroes/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './modules/heroes/hero-detail/hero-detail.component';
import { HeroFormComponent } from './modules/heroes/hero-form/hero-form.component';
import { HeroEditComponent } from './modules/heroes/hero-edit/hero-edit.component';
import { TrainingComponent } from './modules/heroes/heroes-actions/training/training.component';

import { ChatComponent } from './modules/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { WebsocketService } from './modules/chat/websocket-service.service'

import { FriendService } from './modules/heroes/shared/friend.service';
import { FriendsComponent } from './modules/friends/friends.component';
import { FriendListComponent } from './modules/friends/friend-list.component';

const config: SocketIoConfig = { url: 'http://localhost:4201', options: {} };

@NgModule({ 
  declarations: [
    AppComponent,

    HeaderComponent,
    LoginComponent,
    SignupComponent,

    HeroesListComponent, 
    HeroDetailComponent,
    HeroFormComponent,
    HeroEditComponent,
  
    TrainingComponent,
  
    ChatComponent,
  
    FriendsComponent,
    FriendListComponent,
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBt4qiZEj7soWOFuU5FgHNFTf8JGGrGLzs",
      authDomain: "heroproj-f4228.firebaseapp.com",
      databaseURL: "https://heroproj-f4228.firebaseio.com",
      projectId: "heroproj-f4228",
      storageBucket: "heroproj-f4228.appspot.com",
      messagingSenderId: "739594881383"
    }),
    AngularFireDatabaseModule,
    SocketIoModule.forRoot(config) 

  ],
  providers: [AuthService, AuthGuardService, FriendService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
