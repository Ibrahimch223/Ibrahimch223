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
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';


import { DeliverymanRoutingModule } from './deliveryman-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { ListDeliverymanComponent } from './list-deliveryman/list-deliveryman.component';
import { DeliverymanSortableService } from './deliveryman-sortable.directive';
import { UpdateDeliverymanComponent } from './update-deliveryman/update-deliveryman.component';


@NgModule({
  declarations: [ListDeliverymanComponent,DeliverymanSortableService,UpdateDeliverymanComponent],
  imports: [
    CommonModule,
    DeliverymanRoutingModule,
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
export class DeliverymanModule { }
