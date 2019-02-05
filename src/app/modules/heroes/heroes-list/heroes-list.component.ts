import { Component, OnInit } from '@angular/core';

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
export class HeroesListComponent implements OnInit {

  heroes: any[];
  heroesSubscription: Subscription;
  private uid: string
  key: string[];

  /**
  * Creates a new instance of HeroesListComponent
  * @heroService the hero handling service
  * @router the route handling service
  * @authService the session information service
  */
  constructor(private heroService: HeroService, private router: Router, private authService: AuthService) {
    this.heroes = [[0]];
   // this.heroes.unshift()
  }

  /**
  * initialize all required data to display on view : get hero list, filter data received to be readable
  */
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
  

  /**
  * filter data received from ngOnInit() to be readable
  */
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

  /**
  * Navigates user into the hero creation form
  */
  onNewHero(){
    this.router.navigate(['form']);
  }
          
  /**
  * Deletes the hero from database (require to be the hero possessor)
  * @hero the hero to be deleted
  */   
  onDeleteHero(hero:Hero){
    this.heroService.removeHero(hero);
  }
          
  /**
  * sends user to the hero form to edit it
  * @hero the hero to be edited
  * @idHero the hero id to be edited
  */        
  onEdit(hero:Hero, idHero: string){
    // console.log(hero);
    this.router.navigate(['edit', hero.idUser, idHero]);
  }

  /**
  * sends user to the hero detail view
  * @hero the hero to be seen
  */     
  onViewHero(hero:Hero){
    this.router.navigate(['detail', hero.idUser]);
  }

  /**
  * sends user to the hero training view
  * @hero the hero to be trained
  */    
  trainHero(hero: Hero){
    this.router.navigate(['train', hero.idUser]);
  }

  /**
  * TO BE IMPLEMENTED
  * is supposed to send false when the logged in user already has a hero, preventing him to create another (button disabled in view)
  */ 
  canUserCreateHero(){
    // this.heroService.getSingleHero(this.authService.getUid())
  }
}
