import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {filter, map, mergeMap} from 'rxjs/operators';
import {User} from '../shared/interfaces/user';

@Component({
  selector: 'nwt-update',
  templateUrl: './update-user.component.html',
  styleUrls: [ './update-user.component.css' ]
})
export class UpdateUserComponent implements OnInit {
  // private property to store dialog reference
  private _userDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._userService.fetchOne(id))
      )
      .subscribe((user: User) => this._initModal(user));
  }

  /**
   * Initialize modal process
   */
  private _initModal(user: User): void {
    // create modal with initial data inside
    this._userDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: user
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._userDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        map((_: User) => {
          // get user id
          const id = _.id;
          // delete obsolete attributes in original object which are not required in the API
          delete _.id;
          delete _.photo;

          return { id, update: _ };
        }),
        mergeMap(_ => this._userService.update(_.id, _.update))
      )
      .subscribe(
        () => undefined,
        () => this._router.navigate([ '/users' ]),
        () => this._router.navigate([ '/users' ])
      );
  }
}
