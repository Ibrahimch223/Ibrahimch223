import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { UpdatePaymentComponent } from './update-payment/update-payment.component';

const routes: Routes = [
  {
    path: 'list-payment',
    component: ListPaymentComponent,
  },
  {
    path: 'update-payment',
    component: UpdatePaymentComponent,
    data: {
      title: 'update-payment'
    }
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: {
      title: 'invoice'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
