import { NgModule }             from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';

import { HeroDetailComponent }  from './modules/heroes/hero-detail/hero-detail.component';
import { HeroFormComponent }    from './modules/heroes/hero-form/hero-form.component';
import { HeroesListComponent }  from './modules/heroes/heroes-list/heroes-list.component';
import { SignupComponent }      from './modules/auth/signup/signup.component';
import { LoginComponent }       from './modules/auth/login/login.component';
import { AuthGuardService }     from './modules/auth/shared/auth-guard.service';
import { TrainingComponent } from './modules/heroes/heroes-actions/training/training.component';
import { HeroEditComponent }  from './modules/heroes/hero-edit/hero-edit.component';

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
