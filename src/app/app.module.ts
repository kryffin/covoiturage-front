import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {AppRoutingModule} from './app-routing.module';
import {UserComponent} from './user/user.component';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './shared/user-card/user-card.component';
import { RideCardComponent } from './shared/ride-card/ride-card.component';
import { RideComponent } from './ride/ride.component';
import { LocationComponent } from './location/location.component';
import { RidesComponent } from './rides/rides.component';
import {RideService} from './shared/services/ride.service';
import {UserService} from './shared/services/user.service';
import { FormComponent } from './shared/form/form.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateUserComponent } from './update/update-user.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, UserComponent, UsersComponent, UserCardComponent, RideCardComponent, RideComponent, LocationComponent, RidesComponent, FormComponent, DialogComponent, UpdateUserComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [ RideService, UserService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
