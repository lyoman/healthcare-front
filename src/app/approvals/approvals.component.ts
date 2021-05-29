import { formatDate, Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  adminRoles = JSON.parse(localStorage.getItem("isAdmin"));

  competitions_list = [];
  id: any;
  competition1 = [];
  competition: any;
  resultsForm;
  loading: any;

  searchText;
  page = 1;
  pageSize =15;

  vhours: any;
  vminutes: any;
  vseconds: any;

  user: any;

  format1 = 'EEEE, MMMM d, yyyy';
  format = 'MMMM d, y, h:mm:ss a zzzz';
  locale = 'en-US';


  userResults = [];

  fileToUpload: File = null;
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.getResults();

    this.user = JSON.parse(localStorage.getItem('user'));

    // if(JSON.parse(localStorage.getItem("isAdmin")) != true) {
    //   this.location.back();
    // }
  }


  getResults() {
    this.loading = true;
    this.apiService.GetData('/users').subscribe(data => {
      this.loading = false;
      console.log('all users', data);
      this.userResults = data;
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }



}
