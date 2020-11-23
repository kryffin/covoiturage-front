import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {RideComponent} from './ride/ride.component';
import {RidesComponent} from './rides/rides.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {UpdateRideComponent} from './update-ride/update-ride.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'edituser/:id', component: UpdateUserComponent },
  { path: 'rides', component: RidesComponent},
  { path: 'ride/:id', component: RideComponent },
  { path: 'editride/:id', component: UpdateRideComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
