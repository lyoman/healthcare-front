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
    patient_name: this.route.snapshot.paramMap.get('patient_name'),
    patient_id: this.route.snapshot.paramMap.get('patient_id'),
    heart_rate: this.route.snapshot.paramMap.get('heart_rate'),
    respiratory_rate: this.route.snapshot.paramMap.get('respiratory_rate'),
    temperature: this.route.snapshot.paramMap.get('temperature'),
    blood_pressure: this.route.snapshot.paramMap.get('blood_pressure'),
    active: this.route.snapshot.paramMap.get('active'),
    updated: this.route.snapshot.paramMap.get('updated'),
    timestamp: this.route.snapshot.paramMap.get('timestamp'),
  }

}
