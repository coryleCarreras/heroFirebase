import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from '../shared/hero';
import { AuthService } from '../../auth/shared/auth.service';
import { HeroService } from '../shared/hero.service';

@Injectable({
  providedIn: 'root'
})
export class CanCreateHeroGuard {
  hero: Hero[] = [];
  private idP: string;

  constructor(private router: Router, private authService: AuthService, private heroService: HeroService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.idP = this.authService.getUid();
    this.heroService.getSingleHero(this.idP).then((hero: Hero) =>{
      this.hero.unshift(hero);
    });
    //console.log(this.hero[0]);
    if(this.hero[0]){
      return false
    }else {
      return true;
    }
  }
}
