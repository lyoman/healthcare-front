import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';

@Component({
  selector: 'app-view-approval',
  templateUrl: './view-approval.component.html',
  styleUrls: ['./view-approval.component.scss']
})
export class ViewApprovalComponent implements OnInit {


  // format = 'EEEE, MMMM d, yyyy';
  format = 'MMMM d, y, h:mm:ss a zzzz';
  locale = 'en-US';

  user: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (JSON.parse(localStorage.getItem("is_superuser")) != true) {
      this.location.back();
    }
  }

  race = {
    username: this.route.snapshot.paramMap.get('username'),
    email: this.route.snapshot.paramMap.get('email'),
    status: this.route.snapshot.paramMap.get('status'),
    approvedby: this.route.snapshot.paramMap.get('approvedby'),
    updated: this.route.snapshot.paramMap.get('updated'),
    timestamp: this.route.snapshot.paramMap.get('timestamp'),
  }


}
