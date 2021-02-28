import { Injectable } from '@angular/core';

import {Router} from '@angular/router';

import { Observable } from 'rxjs';


@Injectable()
export class LoginService  {
  constructor(protected router: Router) {}
  // to check if a user is logged in
  public isloggedIn = false;

  public isUserloggedIn(): boolean {
    // const auth_info: AuthenticationResponse = JSON.parse(window.localStorage.getItem(this.localStorageObjectNames.auth_token));
    const userInfo = JSON.parse(window.localStorage.getItem('isValidLogin'));
    if ( (userInfo != null )) {
      this.isloggedIn = true;
      return this.isloggedIn;
    }
    this.isloggedIn = false;
    return this.isloggedIn;
  }

  public logOutUser(): void {
    window.localStorage.clear();
    this.isloggedIn = false;
    // redirect to login page after log out
    this.router.navigate(['\login']);
  }

  public loginUserService(user: { username, password }): Observable<any> {
    let validPass = false;
    if (user.username === 'blogger@grapecity.com' && user.password === '1qaz!QAZ') {
      validPass = true;
    }
    const checkIsValid = new Observable<any>(observer => {
      setTimeout(() => observer.next(validPass), 2000);
    });
    return checkIsValid;
  }
}
