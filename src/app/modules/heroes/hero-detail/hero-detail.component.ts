import { Component, OnInit } from '@angular/core';

import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/shared/auth.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  private idP: string;
  private uid: string;
  private idH: number;

  constructor(private heroService: HeroService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.idP = this.route.snapshot.params['iduser'];

    this.uid = this.authService.getUid();

    this.hero = new Hero('', '', '');
    this.idH = this.route.snapshot.params['idhero'];
    this.heroService.getSingleHero(this.idH).then((hero: Hero) =>{
      this.hero = hero;
    });
  }

  onBack(){
    this.router.navigate(['list']);
  }

  trainHero(hero: Hero){
    this.router.navigate(['train', this.uid, this.idH]);
  }

  editHero(hero: Hero){
    this.router.navigate(['edit', this.uid, this.idH]);
  }

  // explore(hero: Hero, id: number){
  //   this.router.navigate(['explore', hero.idUser, id]);
  // }

  getUid(){
    return this.uid;
  }
}
