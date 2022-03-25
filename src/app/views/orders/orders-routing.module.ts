import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/pages/dashboards/default/default.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { PlaningComponent } from './planing/planing.component';
import { UpdateOrdersComponent } from './update-orders/update-orders.component';

const routes: Routes = [
  
  {
    path: 'list-orders',
    component: ListOrdersComponent,
  },
  {
    path: 'update-orders',
    component: UpdateOrdersComponent,
    data: {
      title: 'update-orders'
    }
  },
  {
    path: 'planing',
    component: PlaningComponent,
    data: {
      title: 'planing'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
