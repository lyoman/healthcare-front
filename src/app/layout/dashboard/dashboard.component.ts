import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  is_superuser = JSON.parse(localStorage.getItem('is_superuser'));
  username = JSON.parse(localStorage.getItem("unique_name"));
  realdata = JSON.parse(localStorage.getItem('realdata'));

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getResults();
    this.getUsers();
    this.getApproval();
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

  getUsers() {
    this.loading = true;
    this.apiService.GetData('/users/?id='+JSON.parse(localStorage.getItem('user_id'))).subscribe(data => {
      this.loading = false;
      console.log('one user', data);
      this.userDetails = data;
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
      this.userApproval = data['results'];
      console.log('one approvals', this.userApproval);
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }

}
