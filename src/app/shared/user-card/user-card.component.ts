import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  private _user: User;

  constructor(private _router: Router) {
    this._user = {} as User;
  }

  get user(): User {
    return this._user;
  }

  @Input()
  set user(user: User) {
    this._user = user;
  }

  navigate(id: string): void {
    this._router.navigate(['/user', id]);
  }

  ngOnInit(): void {
  }

}
