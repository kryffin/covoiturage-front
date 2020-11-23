import {Component, Input, OnInit} from '@angular/core';
import {Location, Ride} from '../interfaces/ride';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent implements OnInit {

  private _ride: Ride;

  constructor(private _router: Router) {
    this._ride = {} as Ride;
  }

  get ride(): Ride {
    return this._ride;
  }

  adressDisplay(adress: Location): string {
    return adress.street + ", " + adress.postalCode + " " + adress.city;
  }

  @Input()
  set ride(ride: Ride) {
    this._ride = ride;
  }

  navigate(id: string): void {
    this._router.navigate(['/ride', id])
  }

  ngOnInit(): void {
  }

}
