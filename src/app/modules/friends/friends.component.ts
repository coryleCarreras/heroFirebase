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

  /**
  * Creates a new instance of FriendsComponent 
  * @friendService friend handling service
  * @heroService hero handling service
  * @authService Session information service
  * @router route handling service
  */
  constructor(private friendService: FriendService, private heroService: HeroService, private authService: AuthService, private router: Router) { }

  /**
  * Retrieves friendlist of currently logged in user then gets all hero data about those 
  */
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

  /**
  * Redirects to hero detail view
  * @id the hero id to be seen
  */
  viewFriend(id: string){
    this.router.navigate(['detail', id]);
  }

  /**
  * Deletes mutual friendship between two heroes
  * @id the hero id to be deleted from friendlist
  */
  deleteFriend(id: string){
    this.friendService.deleteFriend(this.uid, id)
    this.friendService.deleteFriend(id, this.uid)
  }

}
