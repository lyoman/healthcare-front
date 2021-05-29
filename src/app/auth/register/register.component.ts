import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading: any;
  getUserDetails: any;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  email: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    console.log("confirmation_password", this.form.confirmation_password);
    console.log("password", this.form.password);
    if (this.form.password != this.form.confirmation_password) {
      this.toastr.error('Error', 'The passwords did not match');
      console.log("The passwords did not match");
      this.loading = false;
    }
    else {
      this.loading = true;
      console.log("form", this.form);
      this.authService.register(this.form).subscribe(
        data => {
          this.loading = false;
          this.isLoginFailed = false;
          console.log("data", data);
          this.toastr.success('Success!', 'Registration successful.');
          this.router.navigateByUrl('/auth/login');
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          console.log(err)
          this.loading = false;
          this.toastr.error('Error', err.message);
        }
      );
    }
  }

}
