import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { UpdateCustomersComponent } from './update-customers/update-customers.component';

const routes: Routes = [
  {
    path: 'list-customers',
    component: ListCustomersComponent,
  },
  {
    path: 'update-customers',
    component: UpdateCustomersComponent,
    data: {
      title: 'update-customers'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
