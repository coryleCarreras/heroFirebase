import { Component, OnInit } from '@angular/core';
import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';
import { AuthService } from 'src/app/modules/auth/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;

  /**
  * Creates a new instance of HeroFormComponent
  * @heroService the hero handling service
  * @formBuilder form handling service
  * @router the route handling service
  * @authService the session information service
  */
  constructor(private heroService: HeroService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  /**
  * initialize the form
  */
  ngOnInit() {
    this.initForm();
  }

  /**
  * Binds name and heroType input to one form group
  */
  initForm(){
    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      heroType: ['', Validators.required]
    }); 
  }

  /**
  * Checks if a user is logged in, then save all hero information into database then redirect to hero list
  */
  onSaveHero(){
    const name = this.heroForm.get('name').value;
    const type = this.heroForm.get('heroType').value;

    const uid = this.authService.getUid();
    if(uid != "NO USER LOGGED IN"){
      const newHero = new Hero(name, type, uid);
      console.log(newHero);
      this.heroService.createNewHero(newHero, uid);
      this.router.navigate(['list']);
    }else{
      console.log(uid);
    }
    
  }
}
