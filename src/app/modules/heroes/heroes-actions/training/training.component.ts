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

  constructor(private router: Router, private route: ActivatedRoute, private heroService: HeroService, private authService: AuthService) { }

  ngOnInit() {
    this.idP = this.route.snapshot.params['iduser'];

    this.uid = this.authService.getUid();
    this.heroService.getSingleHero(this.idP).then((hero: Hero) =>{
      this.hero = new Hero(hero[0].name, hero[0].type, hero[0].idUser);
      this.hero.agi = hero[0].agi;
      this.hero.str = hero[0].str;
      this.hero.int = hero[0].int;
      console.log(this.hero);
    });
  }

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

  applyTraining(){ 
    this.heroService.updateHero(this.hero, this.idP);
  }

  onBack(){
    this.router.navigate(['list']);
  }
}
