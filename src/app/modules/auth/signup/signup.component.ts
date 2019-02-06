import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;

  /**
  * Creates a new instance of SignupComponent
  * @authService the session information service
  * @formBuilder the form handling service
  * @router the route handling service
  */
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 

  }

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
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  /**
   * Creates a new user by calling authService using the inputs filled earlier. Throws an error if can't create, redirect to hero form if ok (and log in the user)
   */
  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    
    this.authService.createUser(email, password).then(
      () => {
        this.router.navigate(['/form']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
