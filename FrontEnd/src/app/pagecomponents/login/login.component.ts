import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
        return;
    }

    this.error = "";

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.signIn(email, password);

    authObs
    .subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/'])},
      error: (e) => {
        this.error = 'An error occurred!';
        console.log(e)}
    });

    form.reset();
  }

}
