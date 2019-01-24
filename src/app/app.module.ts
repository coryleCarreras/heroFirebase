import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/shared/auth.service';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { SignupComponent } from './auth/signup/signup.component';

import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroFormComponent } from './heroes/hero-form/hero-form.component';
import { HeroEditComponent } from './heroes/hero-edit/hero-edit.component';

import { TrainingComponent } from './heroes/heroes-actions/training/training.component';
import { ChatComponent } from './chat/chat.component';

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
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBt4qiZEj7soWOFuU5FgHNFTf8JGGrGLzs",
      authDomain: "heroproj-f4228.firebaseapp.com",
      databaseURL: "https://heroproj-f4228.firebaseio.com",
      projectId: "heroproj-f4228",
      storageBucket: "heroproj-f4228.appspot.com",
      messagingSenderId: "739594881383"
    }),
    AngularFireDatabaseModule,

    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
