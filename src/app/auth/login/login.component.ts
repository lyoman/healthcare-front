import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { routerTransition } from './../../router.animations';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }


  formModel = {
    username: '',
    password: ''
  };

  loginError: any;
  username: any;
  deviceToken: any;

  myUsername: any;

  getUserDetails: any;

  loading: any;

  token: any;

  ngOnInit() {
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit1() {
    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('token', "logged in");
    this.toastr.success('Welcome!', 'Authentication successful.');
    this.router.navigateByUrl('/dashboard');
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    console.log(form.value)
    localStorage.setItem('unique_name', JSON.stringify(form.value.username));
    this.myUsername = form.value.username;
    this.authService.login(form.value)
      .subscribe
      (
        data => {
          localStorage.setItem('token', data['token']);
          console.log("data", data);
          this.loading = false;
          this.token = data['token'];
          this.getUserDetails = jwt_decode(data['token']);
          console.log("getUserDetails", this.getUserDetails);
          localStorage.setItem('user', JSON.stringify(this.getUserDetails));
          localStorage.setItem('user_id', JSON.stringify(this.getUserDetails['user_id']));

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
            this.loginError = err;
          }
          this.toastr.error(this.loginError.message);
        });
  }

}
