import { Component, OnInit, OnDestroy } from '@angular/core';

import { HeroService } from '../shared/hero.service';
import { Hero } from '../shared/hero';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/shared/auth.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  heroes: Hero[];
  heroesSubscription: Subscription;
  private uid: string
  constructor(private heroService: HeroService, private router: Router, private authService: AuthService) {
    
  }

  ngOnInit() {
    this.uid = this.authService.getUid();
    this.heroesSubscription = this.heroService.heroesSubject.subscribe(
      (heroes: Hero[])=>{
        this.heroes = heroes;
      }
    );
    this.heroService.emitHeroes();
    //console.log(this.heroes);
    //console.log(this.uid);
  }

  onNewHero(){
    this.router.navigate(['form']);
  }
             
  onDeleteHero(hero:Hero){
    this.heroService.removeHero(hero);
  }
             
  onEdit(hero:Hero, idHero: number){
    console.log(hero);
    this.router.navigate(['edit', hero.idUser, idHero]);
  }

  onViewHero(hero:Hero, idHero: number){
    this.router.navigate(['detail', hero.idUser, idHero]);
  }

  trainHero(hero: Hero, id: number){
    this.router.navigate(['train', hero.idUser, id]);
  }

  // explore(hero: Hero, id: number){
  //   this.router.navigate(['explore', hero.idUser, id]);
  // }

  ngOnDestroy(){
    this.heroesSubscription.unsubscribe();
  }
}
