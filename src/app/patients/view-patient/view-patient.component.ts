import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {


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
    // if(JSON.parse(localStorage.getItem("isAdmin")) != true) {
    //   this.location.back();
    // }
  }

  race = {
    firstname: this.route.snapshot.paramMap.get('firstname'),
    surname: this.route.snapshot.paramMap.get('surname'),
    email: this.route.snapshot.paramMap.get('email'),
    phoneNumber: this.route.snapshot.paramMap.get('phoneNumber'),
    race: this.route.snapshot.paramMap.get('race'),
    temperature: this.route.snapshot.paramMap.get('temperature'),
  }

}
