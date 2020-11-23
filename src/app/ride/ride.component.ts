import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {merge} from 'rxjs';
import {filter, mergeMap} from 'rxjs/operators';
import {Location, Ride} from '../shared/interfaces/ride';
import {RideService} from '../shared/services/ride.service';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/interfaces/user';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  private _ride: Ride;

  constructor(private _rideService: RideService, private _userService: UserService, private _route: ActivatedRoute) {
    this._ride = {} as Ride;
  }

  get ride(): Ride {
    return this._ride;
  }

  adressDisplay(adress: Location): string {
    return adress.street + ", " + adress.postalCode + " " + adress.city;
  }

  delete(id: string): void {
    this._rideService.delete(id);
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        mergeMap(params => this._rideService.fetchOne(params.id))
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
