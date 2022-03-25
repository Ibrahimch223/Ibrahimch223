import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ViewsRoutingModule } from './views-routing.module';

import { OrdersModule } from './orders/orders.module';
import { LightboxModule } from 'ngx-lightbox';
import { BlogModule } from '../pages/blog/blog.module';
import { ChartModule } from '../pages/chart/chart.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { CustomersModule } from './customers/customers.module';
import { PaymentModule } from './payment/payment.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CategoryModule } from './category/category.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    DeliverymanModule,
    NgbDropdownModule,
    NgbModalModule,
    CustomersModule,
    CategoryModule,
    PaymentModule,
    RoleModule,
    PermissionModule,
    UsersModule,
    VehicleModule,
    ViewsRoutingModule,
    OrdersModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    BlogModule,
    ChartModule,
    WidgetModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule
  ]
})
export class ViewsModule { }
