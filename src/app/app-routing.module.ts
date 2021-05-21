import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: "",
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    pathMatch: "full"
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'patient',
    loadChildren: () => import('./users/patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'nurse',
    loadChildren: () => import('./users/nurse/nurse.module').then((m) => m.NurseModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'doctor',
    loadChildren: () => import('./users/doctor/doctor.module').then((m) => m.DoctorModule),
    canActivate: [AuthGuard]
  },

  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },

  // {
  //   path: 'error',
  //   loadChildren: () => import('./server-error/server-error.module').then((m) => m.ServerErrorModule)
  // },
  // {
  //   path: 'access-denied',
  //   loadChildren: () => import('./access-denied/access-denied.module').then((m) => m.AccessDeniedModule)
  // },
  // { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule) },
  // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
