import { Component, OnInit } from '@angular/core';
import {Location, Ride} from '../shared/interfaces/ride';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';
import {RideService} from '../shared/services/ride.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogRideComponent} from '../shared/dialog-ride/dialog-ride.component';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent implements OnInit {

  private _rides: Ride[];
  private _rideDialog: MatDialogRef<DialogRideComponent>;
  private _dialogStatus: string;
  displayedColumns: string[] = ['position', 'depart', 'arrivee', 'duree', 'prix', 'date', 'details', 'modifier', 'supprimer'];

  constructor(private _router: Router, private _rideService: RideService, private _dialog: MatDialog) {
    this._rides = [];
    this._dialogStatus = 'inactive';
  }

  get rides(): Ride[] {
    return this._rides;
  }

  ngOnInit(): void {
    this._rideService
      .fetch().subscribe((rides: Ride[]) => this._rides = rides);
  }

  openDialog(): void {
    this._dialogStatus = 'active';

    this._rideDialog = this._dialog.open(DialogRideComponent, {
      width: 'auto',
      disableClose: true
    });

    this._rideDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        map((_: Ride) => {
          delete _.id;

          return _;
        }),
        mergeMap(_ => this._add(_))
      )
      .subscribe(
        (rides: Ride[]) => this._rides = rides,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  delete(ride: Ride): void {
    this._rideService
      .delete(ride.id)
      .subscribe(_ => this._rides = this._rides.filter(__ => __.id !== _));
  }

  navigate(id: string): void {
    this._router.navigate([ '/drive', id ]);
  }

  private _add(ride: Ride): Observable<Ride[]> {
    return this._rideService
      .create(ride)
      .pipe(
        mergeMap(_ => this._rideService.fetch())
      );
  }

}
