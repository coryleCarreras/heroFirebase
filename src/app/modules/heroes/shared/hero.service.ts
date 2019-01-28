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
    this.getHeroes();
  }

  emitHeroes(){   
    this.heroesSubject.next(this.heroes);
  }

  saveHeroes(uid: string, hid: string = null){   // Insère plusieurs héros
    if(!uid){
      if(hid== null){
        firebase.database().ref('heroes/').set(this.heroes);
      }else{
        firebase.database().ref('heroes/'+hid).set(this.heroes);
      }
    }else{
      firebase.database().ref('heroes').set(this.heroes);
    }
  }

  getHeroes(){    // Récupère une liste de héros
    firebase.database().ref('/heroes/').on('value', (data: DataSnapshot) => {
      this.heroes = data.val() ? data.val() : [];  
      this.emitHeroes();
    })
  }

  getSingleHero(idH: string){    // récupère un héro par son id
    return new Promise(
        (resolve, reject) => {
          firebase.database().ref('/heroes/'+idH).once('value').then((data:DataSnapshot)=> {
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
    this.heroes.push(newHero);
    this.saveHeroes(uid);
    this.emitHeroes();
  }

  updateHero(hero: Hero, uid: string, hid: string){
    
    //this.heroes.splice(hid, 1);
    //this.heroes.push(hero);
    this.saveHeroes(uid, hid);
    this.emitHeroes();
  }

  removeHero(hero: Hero){
    const heroId = this.heroes.findIndex(
      (heroEl) => {
        if(heroEl === hero){
          return true;
        }
      }
    );
    this.heroes.splice(heroId, 1);
    this.saveHeroes(null);
    this.emitHeroes();
  }
  
}
