import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {merge} from 'rxjs';
import {filter, mergeMap} from 'rxjs/operators';
import {Location, Ride} from '../shared/interfaces/ride';
import {RideService} from '../shared/services/ride.service';
import {User} from '../shared/interfaces/user';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  private _ride: Ride;
  private _driver: User;

  constructor(private _rideService: RideService, private _route: ActivatedRoute, private _router: Router) {
    this._ride = {} as Ride;
    this._ride.start = {} as Location;
    this._ride.finish = {} as Location;
  }

  get ride(): Ride {
    return this._ride;
  }

  get driver(): User {
    return this._driver;
  }

  addressDisplay(address: Location): string {
    return address.street + ", " + address.postalCode + " " + address.city;
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        mergeMap(params => this._rideService.fetchOne(params.id)),
      )
    )
      .subscribe(
        (ride: any) => this._ride = ride,
        () => {
          // manage error when user doesn't exist in DB
          this._ride = this._rideService.defaultRide;
        }
      );
  }

}
