import { Injectable } from '@angular/core';

import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Hero } from './hero';
import { Subject } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroes: Hero[] = [];
  heroesSubject = new Subject<Hero[]>();

  constructor(){
    //this.getHeroes();
  }

  emitHeroes(){   
    this.heroesSubject.next(this.heroes);
  }

  saveHeroes(uid: string){ 
    firebase.database().ref('hero/'+uid).set(this.heroes);
  }

  getHeroes(){    // Récupère une liste de héros
    firebase.database().ref('/hero/').on('value', (data: DataSnapshot) => {
      this.heroes = data.val() ? data.val() : []; 
      this.emitHeroes();
    })
  }

  getSingleHero(uid: string){    // récupère un héro par son id
    return new Promise(
        (resolve, reject) => {
          firebase.database().ref('/hero/'+uid+'/0').once('value').then((data:DataSnapshot)=> {
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

  createNewHero(newHero: Hero, uid: string){
    // console.log(this.heroes)
    // this.heroes = [newHero, ...this.heroes];
    this.heroes = []; 
    this.heroes.unshift(newHero);
    this.heroes.splice(1, (this.heroes.length-1));
    this.saveHeroes(uid);
    this.emitHeroes();
  }

  updateHero(hero: Hero, uid: string){
    this.heroes = []; 
    this.heroes.unshift(hero)
    this.heroes.splice(1, this.heroes.length-1);
    this.saveHeroes(uid);
    this.emitHeroes(); 
  }

  removeHero(hero: Hero){
    this.heroes[hero.idUser] = null ;
    this.saveHeroes('');
    this.emitHeroes();
  }
  
}
