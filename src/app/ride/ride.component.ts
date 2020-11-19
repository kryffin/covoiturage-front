import { Component, OnInit } from '@angular/core';
import {Ride} from '../shared/interfaces/ride';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {RideService} from '../shared/services/ride.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  private _ride: any;

  constructor(private _rideService: RideService, private _route: ActivatedRoute) {
    this._ride = {} as Ride;
  }

  get ride(): Ride {
    return this._ride;
  }

  delete(id: string): void {
    this._rideService.delete(id);
  }

  ngOnInit(): void {
    this._ride = this._rideService.fetchOne(this._route.snapshot.params['id']);
  }

}
