import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/utils/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public user = { username: '', password: '' };
  constructor(private router: Router, private loginService: LoginService,
              private spinner: NgxSpinnerService, public alertService: ToastrService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: max-line-length
    this.spinner.show(undefined, { type: 'ball-fussion', color: 'rgba(100,149,237,.8)' });

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    if (this.loginService.isUserloggedIn()) {
      this.router.navigate(['/']);
    }
  }
  login(): void {
    if (this.user.password != null && this.user.username != null) {
      this.spinner.show(undefined, { type: 'ball-fussion', color: 'rgba(100,149,237,.8)' });
      this.loginService.loginUserService(this.user).subscribe(
        (response) => {
          if (response) {
            window.localStorage.removeItem('isValidLogin');
            window.localStorage.setItem('isValidLogin', response);
            // navigate to home page
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/login']);
            this.alertService.error('Invalid Login details entered.');
          }
          this.spinner.hide();
        },
        (error) => {
          // set loading to false on error
          this.spinner.hide();
          this.alertService.error('Something went wrong!!!.');
        }
      );
    }
  }
}
