import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbNavModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';

import { PaymentRoutingModule } from './payment-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { UpdatePaymentComponent } from './update-payment/update-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [ListPaymentComponent,UpdatePaymentComponent,InvoiceComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
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
    NgbTooltipModule,
    LightboxModule
  ]
})
export class PaymentModule { }
