import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private loginService: LoginService , private router: Router ) {}

  // tslint:disable-next-line: typedef
  canActivate() {
    // check if a user is already logged in
    if (this.loginService.isUserloggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

