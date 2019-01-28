import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './modules/auth/shared/auth.service';
import { AuthGuardService } from './modules/auth/shared/auth-guard.service';
import { ChatListService } from '@Modules/chat/services/chat-list.service';

import { HeaderComponent } from './modules/header/header.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { HeroesListComponent } from './modules/heroes/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './modules/heroes/hero-detail/hero-detail.component';
import { HeroFormComponent } from './modules/heroes/hero-form/hero-form.component';
import { HeroEditComponent } from './modules/heroes/hero-edit/hero-edit.component';
import { ChatComponent } from './modules/chat/chat.component';
import { TrainingComponent } from './modules/heroes/heroes-actions/training/training.component';
import { IsChatLoadedGuard } from './guards/is-chat-loaded/is-chat-loaded.guard';

import { appEffects, getReducers, REDUCER_TOKEN } from './store/chat';
import { StoreModule} from '@ngrx/store';
import { EffectsModule, Effect, Actions } from '@ngrx/effects'
import { environment } from '@Env/environment';

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

    HttpClientModule,
    StoreModule.forRoot(REDUCER_TOKEN),
   
   //EffectsModule.forRoot(appEffects)
  ],
  providers: [AuthService, AuthGuardService, ChatListService, IsChatLoadedGuard, {provide: REDUCER_TOKEN, useFactory: getReducers}],
  bootstrap: [AppComponent]
})
export class AppModule { }
