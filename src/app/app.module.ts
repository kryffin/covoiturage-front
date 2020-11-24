import {LOCALE_ID, NgModule} from '@angular/core';
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
import { RideComponent } from './ride/ride.component';
import { LocationComponent } from './location/location.component';
import { RidesComponent } from './rides/rides.component';
import {RideService} from './shared/services/ride.service';
import {UserService} from './shared/services/user.service';
import { FormUserComponent } from './shared/form-user/form-user.component';
import { DialogUserComponent } from './shared/dialog-user/dialog-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateUserComponent } from './update-user/update-user.component';
import {UpdateRideComponent} from './update-ride/update-ride.component';
import { DialogRideComponent } from './shared/dialog-ride/dialog-ride.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FormRideComponent } from './shared/form-ride/form-ride.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent, HomeComponent, UserComponent, UsersComponent, RideComponent, LocationComponent, RidesComponent, FormUserComponent, DialogUserComponent, UpdateUserComponent, UpdateRideComponent, DialogRideComponent, FormRideComponent],
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
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [ RideService, UserService, {provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
