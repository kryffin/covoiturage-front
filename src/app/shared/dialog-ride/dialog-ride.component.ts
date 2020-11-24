import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Ride} from '../interfaces/ride';

@Component({
  selector: 'app-dialog-ride',
  templateUrl: './dialog-ride.component.html',
  styleUrls: ['./dialog-ride.component.css']
})
export class DialogRideComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DialogRideComponent>, @Optional() @Inject(MAT_DIALOG_DATA) private _ride: Ride) {
  }

  get ride(): Ride {
    return this._ride;
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this._dialogRef.close();
  }

  onSave(ride: Ride): void {
    this._dialogRef.close(ride);
  }

}
