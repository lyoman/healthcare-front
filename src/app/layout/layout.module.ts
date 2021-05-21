import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressComponent } from './components/progress/progress.component';
import { DndDirective } from './dnd.directive';


@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbDropdownModule,
    FormsModule,
  ]
})
export class LayoutModule { }
