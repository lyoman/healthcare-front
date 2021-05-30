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

  is_superuser = JSON.parse(localStorage.getItem('is_superuser'));
  username = JSON.parse(localStorage.getItem("unique_name"));

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getResults();
    this.getUsers();
    console.log("is_superuser", this.is_superuser);
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
    this.apiService.GetData('/users').subscribe(data => {
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

}
