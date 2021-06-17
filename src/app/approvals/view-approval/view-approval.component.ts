import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-approval',
  templateUrl: './view-approval.component.html',
  styleUrls: ['./view-approval.component.scss']
})
export class ViewApprovalComponent implements OnInit {


  // format = 'EEEE, MMMM d, yyyy';
  format = 'MMMM d, y, h:mm:ss a zzzz';
  locale = 'en-US';

  userResults = [];

  race: any;

  user: any;

  loading: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (JSON.parse(localStorage.getItem("is_superuser")) != true) {
      this.location.back();
    }

    this.getResults();
  }

  // race = {
  //   username: this.route.snapshot.paramMap.get('username'),
  //   email: this.route.snapshot.paramMap.get('email'),
  //   status: this.route.snapshot.paramMap.get('status'),
  //   approvedby: this.route.snapshot.paramMap.get('approvedby'),
  //   updated: this.route.snapshot.paramMap.get('updated'),
  //   timestamp: this.route.snapshot.paramMap.get('timestamp'),
  // }

  getResults() {
    this.loading = true;
    this.apiService.GetData('/approvals/'+this.route.snapshot.paramMap.get('id')+'/Approval_detail').subscribe(data => {
      this.loading = false;
      console.log('one request', data);
      this.race = data;
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
