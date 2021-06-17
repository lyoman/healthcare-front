import { formatDate, Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
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
  pageSize = 15;

  vhours: any;
  vminutes: any;
  vseconds: any;

  user: any;

  format1 = 'EEEE, MMMM d, yyyy';
  format = 'MMMM d, y, h:mm:ss a zzzz';
  locale = 'en-US';

  userDetails: any;


  userResults = [];

  fileToUpload: File = null;
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private location: Location,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getResults();

    this.getOneUser();

    this.user = JSON.parse(localStorage.getItem('user'));

    if (JSON.parse(localStorage.getItem("is_superuser")) != true) {
      this.location.back();
    }
  }


  getOneUser() {
    this.loading = true;
    this.apiService.GetData('/users/?id=' + JSON.parse(localStorage.getItem('user_id'))).subscribe(data => {
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


  getResults() {
    this.loading = true;
    this.apiService.GetData('/approvals/').subscribe(data => {
      this.loading = false;
      console.log('all requests', data);
      this.userResults = data['results'];
    },
      err => {
        console.log(err)
        this.loading = false;
        this.toastr.error('Error', err.message);
      }
    );
  }


  approveRequest(id) {
    this.loading = true;

    const formData = {
      // user: this.regForm.get('user').value,
      approvedby: JSON.parse(localStorage.getItem('user_id')),
      status: 'Approved',
    }

    console.log("formData", formData);
    console.log("id", id);

    this.apiService.PutData('/approvals/' + id + '/edit/', formData).subscribe(data => {
      console.log(data)
      this.loading = false;
      this.toastr.success('Success', 'Approval Request has been Approved !!!');
      // this.router.navigateByUrl('/approvals');
      // location.reload();
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



  rejectRequest(id) {
    this.loading = true;

    const formData = {
      // user: this.regForm.get('user').value,
      approvedby: JSON.parse(localStorage.getItem('user_id')),
      status: 'Rejected',
    }

    console.log("formData", formData);
    console.log("id", id);

    this.apiService.PutData('/approvals/' + id + '/edit/', formData).subscribe(data => {
      console.log(data)
      this.loading = false;
      this.toastr.success('Rejected', 'Approval Request Has been Successfully Rejected!!!');
      // this.router.navigateByUrl('/approvals');
      // location.reload();
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
