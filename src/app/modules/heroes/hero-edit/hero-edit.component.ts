import { Component, OnInit } from '@angular/core';
import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';
import { AuthService } from 'src/app/modules/auth/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditComponent implements OnInit {
  heroForm: FormGroup;
  hero: Hero;
  uid: string;
  idH: string;

  /**
  * Creates a new instance of HeroEditComponent, intialize a new empty hero and then retrieves data corresponding to it in database
  * @heroService the hero handling service
  * @formBuilder form handling service
  * @route the route information service
  * @router the route handling service
  * @authService the session information service
  */
  constructor(private heroService: HeroService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
    this.hero = new Hero('', '', '');
    this.uid = this.authService.getUid();
    this.idH = this.route.snapshot.params['idhero'];

    this.heroService.getSingleHero(this.idH).then((hero: Hero) =>{
      this.hero = hero;
    });
  }

  /**
  * Initialize the hero editing form
  */
  ngOnInit() {
    this.initForm();
  }

  /**
  * Binds name and heroType input to one form group
  */
  initForm(){
    this.heroForm = this.formBuilder.group({
      name: [this.hero.name, Validators.required],
      heroType: [this.hero.type, Validators.required]
    }); 
  }

  /**
  * Checks if a user is logged in, then updates all hero information into database then redirect to hero list
  */
  onSaveHero(){
    const name = this.heroForm.get('name').value;
    const type = this.heroForm.get('heroType').value;

    this.hero.name = name;
    this.hero.type = type;
    this.hero.idUser = this.uid;

    this.heroService.updateHero(this.hero, this.uid);
    this.router.navigate(['detail', this.uid, this.idH]);
  }
}
