import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {RideService} from '../shared/services/ride.service';
import {Ride} from '../shared/interfaces/ride';
import {DialogRideComponent} from '../shared/dialog-ride/dialog-ride.component';

@Component({
  selector: 'nwt-update',
  templateUrl: './update-ride.component.html',
  styleUrls: [ './update-ride.component.css' ]
})
export class UpdateRideComponent implements OnInit {
  private _rideDialog: MatDialogRef<DialogRideComponent>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _rideService: RideService, private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._rideService.fetchOne(id))
      )
      .subscribe((ride: Ride) => this._initModal(ride));
  }

  private _initModal(ride: Ride): void {
    // create modal with initial data inside
    this._rideDialog = this._dialog.open(DialogRideComponent, {
      width: '500px',
      disableClose: true,
      data: ride
    });

    // subscribe to afterClosed observable to set dialog-user status and do process
    this._rideDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        map((_: Ride) => {
          // get user id
          const id = _.id;
          // delete obsolete attributes in original object which are not required in the API
          delete _.id;

          return { id, update: _ };
        }),
        mergeMap(_ => this._rideService.update(_.id, _.update))
      )
      .subscribe(
        () => undefined,
        () => this._router.navigate([ '/drives' ]),
        () => this._router.navigate([ '/dives' ])
      );
  }
}
