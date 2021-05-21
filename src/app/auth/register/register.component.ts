import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  // regForm;
  // loading: any;

  // constructor(
  //   private router: Router,
  //   private toastr: ToastrService,
  //   private authService: AuthService,
  //   private formBuilder: FormBuilder
  // ) {
  //   this.regForm = this.formBuilder.group({
  //     id: '',
  //     Username: new FormControl({ value: '', disabled: false }, Validators.required),
  //     Firstname: new FormControl({ value: '', disabled: false }, Validators.required),
  //     Surname: new FormControl({ value: '', disabled: false }, Validators.required),
  //     Email: new FormControl({ value: '', disabled: false }, Validators.required),
  //     PhoneNumber: new FormControl({ value: '', disabled: false }, Validators.required),
  //     Employee: new FormControl({ value: 'false', disabled: false }, Validators.required),
  //     EmpNo: new FormControl({ value: '', disabled: false }),
  //     Race: new FormControl({ value: '10 km', disabled: false }, Validators.required),
  //     Route: new FormControl({ value: 'N/A', disabled: false }, Validators.required),
  //     NextOfKin: new FormControl({ value: '', disabled: false }, Validators.required),
  //     NextOfKinContact: new FormControl({ value: '', disabled: false }, Validators.required),
  //     Password: new FormControl({ value: '', disabled: false }, Validators.required),
  //     ConfirmPassword: new FormControl({ value: '', disabled: false }, Validators.required),
  //   });
  // }

  // ngOnInit(): void {
  // }

  // saveRegister(regForm) {
  //   this.loading = true;
  //   console.log(regForm);
  //   // this.loading = false;

  //   if (this.regForm.get('ConfirmPassword').value != this.regForm.get('Password').value) {
  //     this.toastr.error('Error', 'The passwords did not match');
  //     console.log("The passwords did not match");
  //     this.loading = false;
  //   } else {
  //     if(this.regForm.get('Employee').value == 'true') {
  //       this.regForm.get('Employee').value = true;
  //     }

  //     if(this.regForm.get('Employee').value == 'false') {
  //       this.regForm.get('Employee').value = false;
  //     }
  //     const formData = {
  //       Username: this.regForm.get('Username').value,
  //       Firstname: this.regForm.get('Firstname').value,
  //       Surname: this.regForm.get('Surname').value,
  //       Email: this.regForm.get('Email').value,
  //       PhoneNumber: this.regForm.get('PhoneNumber').value,
  //       Employee: this.regForm.get('Employee').value,
  //       EmpNo: this.regForm.get('EmpNo').value,
  //       Race: this.regForm.get('Race').value,
  //       Route: this.regForm.get('Route').value,
  //       NextOfKin: this.regForm.get('NextOfKin').value,
  //       NextOfKinContact: this.regForm.get('NextOfKinContact').value,
  //       Password: this.regForm.get('Password').value,
  //       ConfirmPassword: this.regForm.get('ConfirmPassword').value,
  //     }

  //     this.authService.register(formData).subscribe(data => {
  //       console.log(data)
  //       this.loading = false;
  //       this.toastr.success('Success', 'Registration saved successfully');
  //       this.router.navigateByUrl('/login');
  //     },
  //       err => {
  //         console.log(err)
  //         this.loading = false;
  //         this.toastr.error('Error', err.message);
  //       }
  //     );
  //   }
  // }

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
