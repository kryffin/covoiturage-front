import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {merge} from 'rxjs';
import {filter, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private _user: User;

  constructor(private _userService: UserService, private _route: ActivatedRoute) {
    this._user = {} as User;
  }

  get user(): User {
    return this._user;
  }

  get userPhoto(): string {
    return this._user.photo == null ? "https://randomuser.me/api/portraits/lego/6.jpg" : this._user.photo;
  }

  delete(id: string): void {
    this._userService.delete(id);
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        mergeMap(params => this._userService.fetchOne(params.id))
      )
    )
      .subscribe(
        (user: any) => this._user = user,
        () => {
          // manage error when user doesn't exist in DB
          this._user = this._userService.defaultUser;
        }
      );
  }

}
