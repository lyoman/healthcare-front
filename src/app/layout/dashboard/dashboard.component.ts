import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: any;
  userResults = [];
  userDetails = [];
  userApproval = [];
  userAllApproval = [];
  oneuserDetails = [];
  count: any;

  regForm;

  is_superuser = JSON.parse(localStorage.getItem('is_superuser'));
  username = JSON.parse(localStorage.getItem("unique_name"));
  realdata = JSON.parse(localStorage.getItem('realdata'));

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.regForm = this.formBuilder.group({
      user: new FormControl({ value: JSON.parse(localStorage.getItem('user_id')), disabled: false }, Validators.required),
      approvedby: new FormControl({ value: '', disabled: false }, Validators.required),
    });
   }

  ngOnInit(): void {
    this.getResults();
  

    if(JSON.parse(localStorage.getItem('is_superuser')) == false) {
      this.getApproval();
    }

    if(JSON.parse(localStorage.getItem('is_superuser')) == true) {
      this.getAllApprovals();
    }

    if(JSON.parse(localStorage.getItem('is_superuser')) == false) {
      this.getOneUser();
    }

    if(JSON.parse(localStorage.getItem('is_superuser')) == true) {
      this.getUsers();
    }
    console.log("is_superuser", JSON.parse(localStorage.getItem('is_superuser')));
  }

  getResults() {
    this.loading = true;
    this.apiService.GetData('/patients').subscribe(data => {
      this.loading = false;
      console.log('all patients', data['results']);
      this.userResults = data['results'];
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }

  pendingReq() {
    this.toastr.info('Pending', "Your Approval Request is still waiting for Approval");
  }

  rejectedReq() {
    this.toastr.error('Rejected', "Your Approval Request was rejected");
  }

  getUsers() {
    this.loading = true;
    this.apiService.GetData('/users/').subscribe(data => {
      this.loading = false;
      console.log('all users', data);
      this.userDetails = data;
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }

  getOneUser() {
    this.loading = true;
    this.apiService.GetData('/users/?id='+JSON.parse(localStorage.getItem('user_id'))).subscribe(data => {
      this.loading = false;
      console.log('one user', data);
      this.oneuserDetails = data[0];
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }

  getApproval() {
    this.loading = true;
    this.apiService.GetData('/approvals/?id='+JSON.parse(localStorage.getItem('user_id'))).subscribe(data => {
      this.loading = false;
      console.log('approvals', data);
      if (data.count == 0) {
        this.userApproval = data['results'];
      } else {
        this.userApproval = data['results'][0];
        console.log('one approvals', this.userApproval);
      }
      this.count = data.count;
      // console.log("count", this.userApproval['status']);
      
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }


  getAllApprovals() {
    this.loading = true;
    this.apiService.GetData('/approvals/').subscribe(data => {
      this.loading = false;
      console.log('all approvals', data);
      this.userAllApproval = data['results'];
      this.count = data.count;
      console.log("all approvals", this.userAllApproval);
      console.log('all approvals', this.userAllApproval);
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }


  saveRequest() {
    this.loading = true;

      const formData = {
        user: this.regForm.get('user').value,
        // approvedby: this.regForm.get('approvedby').value,
      }

      console.log("formData", formData);

      this.apiService.PostData('/approvals/Approval_new/', formData).subscribe(data => {
        console.log(data)
        this.loading = false;
        this.toastr.success('Success', 'Approval Request sent successfully');
        // this.router.navigateByUrl('/dashboard');
        setTimeout(function () {
          location.reload();
        }, 2000);
      },
        err => {
          this.loading = false;
          if (err.status === 400) {
            this.toastr.error('Error.', 'Pliz fill in all fields!');
            this.toastr.error('Error', err.message);
            // console.log(err.error.message);
          } else {
            console.log(err)
            this.toastr.error('Error', err.message);
          }

        }
      );
    }


}
