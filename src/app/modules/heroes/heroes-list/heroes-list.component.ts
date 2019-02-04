import { Component, OnInit, OnDestroy } from '@angular/core';

import { HeroService } from '../shared/hero.service';
import { Hero } from '../shared/hero';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/shared/auth.service';
import { delay } from 'q';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  heroes: any[];
  heroesSubscription: Subscription;
  private uid: string
  key: string[];

  constructor(private heroService: HeroService, private router: Router, private authService: AuthService) {
    this.heroes = [[0]];
   // this.heroes.unshift()
  }

  ngOnInit() {
    this.uid = this.authService.getUid();
    this.heroService.getHeroes();
    this.heroesSubscription = this.heroService.heroesSubject.subscribe(
      (heroes: Hero[])=>{
        this.heroes.unshift(heroes)
      }      
    );
    this.heroService.emitHeroes();
    
    this.sortThisHeroes();
    //console.log(this.heroes);
    // console.log(this.heroes[0]);
    this.canUserCreateHero();
  }
  
  sortThisHeroes(){
    var i = 0, j = 0;
    this.key = []
    for (var prop in this.heroes[0]) {
      this.key[j] = prop
      for(var p in this.heroes[0][prop]){
        
        // console.log(this.heroes[0][prop][p]);
        i++;
      }
      j++;
    }
    // console.log(this.key);
    // console.log(this.heroes[0][this.key[0]][0]);
    // console.log(this.heroes[0][this.key[1]][0]);
  }

  onNewHero(){
    this.router.navigate(['form']);
  }
             
  onDeleteHero(hero:Hero){
    this.heroService.removeHero(hero);
    this.router.navigate(['']);
  }
             
  onEdit(hero:Hero, idHero: number){
    // console.log(hero);
    this.router.navigate(['edit', hero.idUser, idHero]);
  }

  onViewHero(hero:Hero){
    this.router.navigate(['detail', hero.idUser]);
  }

  trainHero(hero: Hero){
    this.router.navigate(['train', hero.idUser]);
  }

  canUserCreateHero(){
    // this.heroService.getSingleHero(this.authService.getUid())
  }

  ngOnDestroy(){
    this.heroesSubscription.unsubscribe();
  }
}
