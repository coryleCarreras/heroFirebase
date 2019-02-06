import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  /**
  * Creates a new instance of LoginComponent
  * @formBuilder the form handling service
  * @authService the session information service
  * @router the route handling service
  */
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  /**
   * Initialize the form
   */
  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize the form by binding all inputs into one group
   */
  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  /**
   * Uses the data provided in the form to checks if the user data matches the database data. If true, redirect to hero list view, otherwise throws an error
   */
  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    
    this.authService.logIn(email, password).then(
      () => {
        this.router.navigate(['list']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
