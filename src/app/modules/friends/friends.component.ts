import { Component, OnInit } from '@angular/core';
import { FriendService } from '../heroes/shared/friend.service';
import { HeroService } from '../heroes/shared/hero.service';
import { Subscription } from 'rxjs';
import { Hero } from '../heroes/shared/hero';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  fr = '';
  frf = '';
  uid = '' ;
  friends = [] ;
  friendss = [];
  heroes = [];
  heroesSubscription: Subscription;

  constructor(private friendService: FriendService, private heroService: HeroService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.uid = this.authService.getUid()
    this.friendService.getFriends().then((s: string) =>{
      this.fr = s ;
      if(this.fr != null) {
        this.friends = this.fr.split(';');
        for (let i = 0; i < this.friends.length; i++) {
          this.heroService.getSingleHero(this.friends[i]).then((hero: Hero) =>{
            this.heroes.push(hero);
          }) 
        }
        //console.log(this.heroes)
      }
    });
  }

  viewFriend(id){
    this.router.navigate(['detail', id]);
  }

  deleteFriend(id){
    var tab = []
    this.friendService.deleteFriend(id, this.uid)
    this.friendService.deleteFriend(this.uid, id)
  }
}
