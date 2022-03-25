import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehicleComponent } from './list-vehicle/list-vehicle.component';
import { UpdateVehicleComponent } from './update-vehicle/update-vehicle.component';

const routes: Routes = [
  {
    path: 'list-vehicle',
    component: ListVehicleComponent,
  },
  {
    path: 'update-vehicle',
    component: UpdateVehicleComponent,
    data: {
      title: 'update-vehicle'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
