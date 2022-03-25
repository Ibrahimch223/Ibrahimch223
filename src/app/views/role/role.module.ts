import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbNavModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { RoleRoutingModule } from './role-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { ListRoleComponent } from './list-role/list-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';


@NgModule({
  declarations: [ListRoleComponent,UpdateRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NgbDropdownModule,
    NgApexchartsModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbModalModule,
    NgbDatepickerModule,
    ArchwizardModule,
    DropzoneModule,
    SimplebarAngularModule,
    FullCalendarModule,
    NgSelectModule,
    LightboxModule
  ]
})
export class RoleModule { }
