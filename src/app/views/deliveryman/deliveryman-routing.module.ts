import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeliverymanComponent } from './list-deliveryman/list-deliveryman.component';
import { UpdateDeliverymanComponent } from './update-deliveryman/update-deliveryman.component';

const routes: Routes = [
  {
    path: 'list-deliveryman',
    component: ListDeliverymanComponent,
  },
  {
    path: 'update-deliveryman',
    component: UpdateDeliverymanComponent,
    data: {
      title: 'update-deliveryman'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliverymanRoutingModule { }
