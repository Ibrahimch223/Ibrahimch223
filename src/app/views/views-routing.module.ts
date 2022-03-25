import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightboxModule } from 'ngx-lightbox';

const routes: Routes = [
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'deliveryman', loadChildren: () => import('./deliveryman/deliveryman.module').then(m => m.DeliverymanModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  { path: 'vehicle', loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule) },
  { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  { path: 'permission', loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes),LightboxModule],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
