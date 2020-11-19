import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private _user: any;

  constructor(private _userService: UserService, private _route: ActivatedRoute) {
    this._user = {} as User;
  }

  get user(): User {
    return this._user;
  }

  delete(id: string): void {
    this._userService.delete(id);
  }

  ngOnInit(): void {
    this._user = this._userService.fetchOne(this._route.snapshot.params['id']);
  }

}
