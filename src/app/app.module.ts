import { AuthGuard } from './guard/auth.guard';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MbscModule } from '@mobiscroll/angular-lite';
// import { RegisterComponent } from './auth/register/register.component';
import { PatientComponent } from './users/patient/patient.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthHeaderComponent } from './auth/components/auth-header/auth-header.component';
import { AuthFooterComponent } from './auth/components/auth-footer/auth-footer.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
// import { CustomFormsModule } from 'ngx-custom-validators';
// import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';

const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    // RegisterComponent,
    PatientComponent,
    // RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    // CustomFormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule, 
    RouterModule.forRoot(routes, { useHash: true }),  // .../#/crisis-center/
    MbscModule,
    MatSidenavModule,
    MatDividerModule,
    // PdfViewerModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
