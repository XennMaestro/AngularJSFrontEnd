import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      comfirmPassword: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.min(18), Validators.max(99)]),
  });
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
        return;
    }

    this.error = "";

    const email = form.value.email;
    const password = form.value.password;
    const passwordConfirm = form.value.comfirmPassword;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const age = form.value.age;

    console.log(age);

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.singUp(firstName, lastName, password, passwordConfirm, email, age);

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
