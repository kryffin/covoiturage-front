import { Component, OnInit } from '@angular/core';
import {Ride} from '../shared/interfaces/ride';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {RideService} from '../shared/services/ride.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  private _rides: Ride[];

  constructor(private _router: Router, private _rideService: RideService) {
    this._rides = [];
  }

  get rides(): Ride[] {
    return this._rides;
  }

  ngOnInit(): void {
    this._rideService
      .fetch().subscribe((rides: Ride[]) => this._rides = rides);
  }

  delete(ride: Ride): void {
    this._rideService
      .delete(ride.id)
      .subscribe(_ => this._rides = this._rides.filter(__ => __.id !== _));
  }

  navigate(id: string): void {
    this._router.navigate([ '/ride', id ]);
  }

  private _add(ride: Ride): Observable<Ride[]> {
    return this._rideService
      .create(ride)
      .pipe(
        mergeMap(_ => this._rideService.fetch())
      );
  }

}
