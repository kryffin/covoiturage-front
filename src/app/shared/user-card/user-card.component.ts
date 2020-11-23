import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  private _user: User;
  private readonly _delete$: EventEmitter<User>;

  constructor(private _router: Router) {
    this._user = {} as User;
    this._delete$ = new EventEmitter<User>();
  }

  get user(): User {
    return this._user;
  }

  get userPhoto(): string {
    return this._user.photo == null ? "https://randomuser.me/api/portraits/lego/6.jpg" : this._user.photo;
  }

  @Input()
  set user(user: User) {
    this._user = user;
  }

  @Output('deleteUser') get delete$(): EventEmitter<User> {
    return this._delete$;
  }

  ngOnInit(): void {
  }

  delete(user: User): void {
    this._delete$.emit(user);
  }

  navigate(id: string): void {
    this._router.navigate([ '/user', id ]);
  }

}
