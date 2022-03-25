import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';

const routes: Routes = [
  {
    path: 'list-users',
    component: ListUsersComponent,
  },
  {
    path: 'update-users',
    component: UpdateUsersComponent,
    data: {
      title: 'update-users'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
