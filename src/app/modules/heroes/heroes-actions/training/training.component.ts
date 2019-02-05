import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../../shared/hero';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '../../shared/hero.service';
import { AuthService } from 'src/app/modules/auth/shared/auth.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  hero: Hero ;

  private uid: string;
  private idP: string;
  private idH: string;

  /**
  * Creates a new instance of TrainingComponent
  * @router the route handling service
  * @route route information service
  * @heroService the hero handling service
  * @authService the session information service
  */
  constructor(private router: Router, private route: ActivatedRoute, private heroService: HeroService, private authService: AuthService) { 

  }

  /**
  * gets the currently to-be-trained hero id 
  * Checks if logged in user owns the to-be-trained hero. If not, redirect to hero list
  */
  ngOnInit() {
    this.idP = this.route.snapshot.params['iduser'];

    this.uid = this.authService.getUid();
    if(this.idP == this.uid){
      this.heroService.getSingleHero(this.idP).then((hero: Hero) =>{
        this.hero = new Hero(hero[0].name, hero[0].type, hero[0].idUser);
        this.hero.agi = hero[0].agi;
        this.hero.str = hero[0].str;
        this.hero.int = hero[0].int;
        console.log(this.hero);
      });
    }else this.onBack()
  }

  /**
  * increase the power of a hero by increasing on of its stat
  * @statTrained the stat to be trained ('agi', 'int' or 'str')
  */
  train(statTrained: string){
    switch(statTrained){
      case 'str': 
          this.hero.newStats(true, false, false);
          break;
      case 'int': 
          this.hero.newStats(false, true, false);
          break;
      case 'agi': 
          this.hero.newStats(false, false, true);
          break;
    }

    this.applyTraining();
  }

  /**
  * Updates the hero in database so the changes in its stat are saved
  */
  applyTraining(){ 
    this.heroService.updateHero(this.hero, this.idP);
  }

  /**
  * Redirect the user to the hero list
  */
  onBack(){
    this.router.navigate(['list']);
  }
}
