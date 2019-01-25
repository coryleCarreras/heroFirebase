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
  private hero: Hero

  private idP: string;
  private idH: string;

  constructor(private router: Router, private route: ActivatedRoute, private heroService: HeroService, private authService: AuthService) { }

  ngOnInit() {
    
    if(this.authService.getUid() != this.route.snapshot.params['iduser']){
      this.router.navigate(['list']);
    }


    this.idP = this.route.snapshot.params['iduser'];
    this.hero = new Hero('', '', '');
    this.idH = this.route.snapshot.params['idhero'];
    this.heroService.getSingleHero(this.idH).then((hero: Hero) =>{
      this.hero = hero;
    });
  }

  train(statTrained: string){
    switch(statTrained){
      case 'str': 
          this.hero.str ++ ;
          break;
      case 'int': 
          this.hero.int ++ ;
          break;
      case 'agi': 
          this.hero.agi ++ ;
          break;
    }

    this.applyTraining();
  }

  applyTraining(){ 
    this.heroService.updateHero(this.hero, this.idP, this.idH);
  }

  onBack(){
    this.router.navigate(['list']);
  }
}
