// import { NgxSpinnerService } from 'ngx-spinner';
import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as jwt_decode from 'jwt-decode';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  loading: any;
  getUserDetails: any;
  loginError: any;

 
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any;

  deviceId: any;
  device: any;
  notificationToken: any;

  user_id: any;
  user: [];
  id: any;

  email: any;

  deviceInfo = null;
  deviceInfo1 = null;
  deviceInfo2 = null;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.loading = false;
        console.log(jwt_decode(data['token']));
        this.getUserDetails = jwt_decode(data['token']);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('userDetails', JSON.stringify(jwt_decode(data['token'])));
        localStorage.setItem('unique_name', JSON.stringify(this.getUserDetails.username));
        this.toastr.success('Welcome!', 'Authentication successful.');
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.loading = false;
        console.log(err);
        if (err.status === 400) {
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        } else {
          this.errorMessage = err;
        }
        this.toastr.error(err.message);
      }
    );
  }

}
