import { NgModule }             from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';

import { HeroDetailComponent }  from './heroes/hero-detail/hero-detail.component';
import { HeroFormComponent }    from './heroes/hero-form/hero-form.component';
import { HeroesListComponent }  from './heroes/heroes-list/heroes-list.component';
import { SignupComponent }      from './auth/signup/signup.component';
import { LoginComponent }       from './auth/login/login.component';
import { AuthGuardService }     from './auth/shared/auth-guard.service';
import { TrainingComponent } from './heroes/heroes-actions/training/training.component';
import { HeroEditComponent }  from './heroes/hero-edit/hero-edit.component';

const routes: Routes = [
  { path: 'detail/:iduser/:idhero', component: HeroDetailComponent },
  { path: 'train/:iduser/:idhero', canActivate:[AuthGuardService], component: TrainingComponent },
  { path: 'edit/:iduser/:idhero', canActivate:[AuthGuardService], component: HeroEditComponent },
  { path: 'form', canActivate:[AuthGuardService], component: HeroFormComponent }, // Gaffe aux '/' et autres
  { path: 'list', component: HeroesListComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
