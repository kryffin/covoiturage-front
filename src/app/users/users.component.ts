import { Component, OnInit } from '@angular/core';
import {User} from '../shared/interfaces/user';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _users: User[];
  private _gg = 3;

  constructor(private _router: Router, private _userService: UserService) {
    this._users = [];
  }

  get users(): User[] {
    return this._users;
  }

  get gg(): number {
    return this._gg;
  }

  ngOnInit(): void {
    this._userService
      .fetch().subscribe((users: User[]) => this._users = users);
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
