import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/interfaces/user';
import {Ride} from '../shared/interfaces/ride';
import {RideService} from '../shared/services/ride.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  constructor(private _rideService: RideService) {
  }

  get rides(): Ride[] {
    return this._rideService.fetch();
  }

  ngOnInit(): void {
  }

}
