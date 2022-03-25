import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './list-role/list-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

const routes: Routes = [
  {
    path: 'list-role',
    component: ListRoleComponent,
  },
  {
    path: 'update-users',
    component: UpdateRoleComponent,
    data: {
      title: 'update-users'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
