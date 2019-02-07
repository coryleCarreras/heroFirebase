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
  friend: boolean
  sameUser: boolean

  /**
  * Creates a new instance of HeroEditComponent, intialize a new empty hero and then retrieves data corresponding to it in database
  * @heroService the hero handling service
  * @authService the session information service
  * @friendService the friend handling service
  * @route the route information service
  * @router the route handling service
  */
  constructor(private heroService: HeroService, private authService: AuthService, private friendService: FriendService, private route: ActivatedRoute, private router: Router) { }

  /**
   * Gets hero data corresponding to URL param
   */
  ngOnInit() {
    this.idP = this.route.snapshot.params['iduser'];
    

    this.uid = this.authService.getUid();
    this.heroService.getSingleHero(this.idP).then((hero: Hero) =>{
      this.hero.push(hero);
      if(this.idP == this.uid){
        this.sameUser = true
        this.friend = false 
      }else {
        this.sameUser = false
        this.friendService.isFriend(this.hero[0].idUser).then((fr) =>{
          this.friend = fr
        })
      }
    });

    //console.log(this.hero);
  }

  /**
   * Redirects to hero list view
   */
  onBack(){
    this.router.navigate(['list']);
  }

  /**
   * Redirects to hero training view
   */
  trainHero(){
    this.router.navigate(['train', this.uid]);
  }

  /**
   * Redirects to hero edit view
   */
  editHero(){
    this.router.navigate(['edit', this.uid]);
  }

  /**
   * Sends a friendship request to hero (not the currently logged in hero)
   */
  addFriend(){
    this.friendService.sendRequest(this.idP, this.uid);
    this.friendService.sendRequest(this.uid, this.idP);
  }
       
  /**
   * Deletes hero data on databse then redirect to hero list view
   */      
  onDeleteHero(hero:Hero){
    this.heroService.removeHero(hero);
    this.router.navigate(['list']);
  }

  loggedIn(){
    if(this.uid == "NO USER LOGGED IN"){
      return false 
    } else return true
  }

  online(){
    if(this.hero[0].onlineStatus == true){
      return true
    }else{
      return false
    }
   }
}
