import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router'
import { User } from './user.model';

export interface AuthResponseData {
  status: string;
  token: string;
}

@Injectable()
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {

  }

  singUp(firstName: string, lastName: string, password: string, passwordConfirm: string, email: string, age: Number){
   return this.http.post<AuthResponseData>(
      'http://127.0.0.1:3000/api/v1/users/signup',
      {
          firstName: firstName,
          lastName: lastName,
          password: password,
          passwordConfirm: passwordConfirm,
          email: email,
          age: age
      }
      ).pipe(tap(res => {
        const user = new User(res.token);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
      );
  }

  signIn(email: string, password: string){
   return this.http.post<AuthResponseData>(
      'http://127.0.0.1:3000/api/v1/users/login',
      {
          email: email,
          password: password
      }
      ).pipe(tap(res => {
        const user = new User(res.token);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
      );
  }

  autoLogin() {
    const userData: {
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    //console.log(userData._token);

    const loadedUser = new User(userData._token);

    //console.log(loadedUser.token);

    if (loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(['/login']);
  }
}
