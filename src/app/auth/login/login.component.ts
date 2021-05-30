import { browser } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { routerTransition } from './../../router.animations';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

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
    private apiService: ApiService,
  ) { }

  race = [];

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
          this.getResults(JSON.parse(localStorage.getItem('user_id')));
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
            this.toastr.error("error", err.message);
          }
        });
  }

  getResults(id) {
    this.loading = true;
    this.apiService.GetData('/users/user_detail/'+id).subscribe(data => {
      this.loading = false;
      console.log('user data', data);
      this.race = data;
      localStorage.setItem('is_superuser', JSON.stringify(data['is_superuser']));
      localStorage.setItem('is_staff', JSON.stringify(data['is_staff']));
      localStorage.setItem('is_active', JSON.stringify(data['is_active']));
      localStorage.setItem('is_specialist', JSON.stringify(data['is_specialist']));
      localStorage.setItem('is_doctor', JSON.stringify(data['is_doctor']));
      localStorage.setItem('is_physician', JSON.stringify(data['is_physician']));
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }

}
