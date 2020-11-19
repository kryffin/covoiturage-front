import { Component, OnInit } from '@angular/core';
import {PEOPLE} from '../_static/people';
import {User} from '../shared/interfaces/user';
import {UserService} from '../shared/services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _userService: UserService) {
  }

  get users(): User[] {
    return this._userService.fetch();
  }

  ngOnInit(): void {
  }

}
