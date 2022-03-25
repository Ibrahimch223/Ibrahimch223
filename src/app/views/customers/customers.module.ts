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
import { CustomersRoutingModule } from './customers-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { UpdateCustomersComponent } from './update-customers/update-customers.component';
import { CustomersSortableService } from './customers-sortable.directive';


@NgModule({
  declarations: [ListCustomersComponent,UpdateCustomersComponent,CustomersSortableService],
  imports: [
    CommonModule,
    CustomersRoutingModule,
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
export class CustomersModule { }
