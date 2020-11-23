import { Component, OnInit } from '@angular/core';
import {User} from '../shared/interfaces/user';
import {Observable} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _users: User[];
  private _userDialog: MatDialogRef<DialogComponent>;
  private _dialogStatus: string;
  displayedColumns: string[] = ['position', 'photo', 'nom', 'age', 'modifier', 'supprimer'];

  constructor(private _router: Router, private _userService: UserService, private _dialog: MatDialog) {
    this._users = [];
    this._dialogStatus = 'inactive';
  }

  get users(): User[] {
    return this._users;
  }

  userPhoto(i: number): string {
    return this._users[i].photo == null ? "https://randomuser.me/api/portraits/lego/6.jpg" : this._users[i].photo;
  }

  ngOnInit(): void {
    this._userService
      .fetch().subscribe((users: User[]) => this._users = users);
  }

  openDialog(): void {
    this._dialogStatus = 'active';

    this._userDialog = this._dialog.open(DialogComponent, {
      width: 'auto',
      disableClose: true
    });

    this._userDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        map((_: User) => {
          delete _.id;
          delete _.photo;

          return _;
        }),
        mergeMap(_ => this._add(_))
      )
      .subscribe(
        (users: User[]) => this._users = users,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  delete(user: User): void {
    this._userService
      .delete(user.id)
      .subscribe(_ => this._users = this._users.filter(__ => __.id !== _));
  }

  navigate(id: string): void {
    this._router.navigate([ '/user', id ]);
  }

  private _add(user: User): Observable<User[]> {
    return this._userService
      .create(user)
      .pipe(
        mergeMap(_ => this._userService.fetch())
      );
  }

}
