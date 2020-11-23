import {Component, Inject, OnInit, Optional} from '@angular/core';
import {User} from '../interfaces/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) private _user: User) {
  }

  get user(): User {
    return this._user;
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this._dialogRef.close();
  }

  onSave(user: User): void {
    this._dialogRef.close(user);
  }

}
