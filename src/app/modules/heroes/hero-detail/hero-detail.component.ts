import { Component, OnInit } from '@angular/core';

import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/shared/auth.service';
import { FriendService } from '../shared/friend.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero[] = [];
  private idP: string;
  private uid: string;

  constructor(private heroService: HeroService, private authService: AuthService, private friendService: FriendService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.idP = this.route.snapshot.params['iduser'];

    this.uid = this.authService.getUid();
    this.heroService.getSingleHero(this.idP).then((hero: Hero) =>{
      this.hero.push(hero);
    });
    //console.log(this.hero);
  }

  onBack(){
    this.router.navigate(['list']);
  }

  trainHero(hero: Hero){
    this.router.navigate(['train', this.uid]);
  }

  editHero(hero: Hero){
    this.router.navigate(['edit', this.uid]);
  }

  addFriend(){
    this.friendService.addFriend(this.idP, this.uid);
  }
             
  onDeleteHero(hero:Hero){
    this.heroService.removeHero(hero);
    this.router.navigate(['list']);
  }

  // explore(hero: Hero, id: number){
  //   this.router.navigate(['explore', hero.idUser, id]);
  // }

  getUid(){
    return this.uid;
  }
}
