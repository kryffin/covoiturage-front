import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import { User } from '../interfaces/user';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _backendURL: any;
  private readonly _defaultUser: User;

  constructor(private _http: HttpClient) {

    this._defaultUser = {
      firstname: 'firstname',
      lastname: 'lastname',
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      age: 0,
      email: 'email@ema.il',
      phone: '+33700000000',
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  get defaultUser(): User {
    return this._defaultUser;
  }

  fetch(): Observable<User[]> {
    return this._http.get<User[]>(this._backendURL.allUsers)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<User> {
    return this._http.get<User>(this._backendURL.oneUser.replace(':id', id));
  }

  create(user: User): Observable<any> {
    return this._http.post<User>(this._backendURL.allUsers, user, this._options());
  }

  update(id: string, user: User): Observable<any> {
    return this._http.put<User>(this._backendURL.oneUser.replace(':id', id), user, this._options());
  }

  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneUser.replace(':id', id), this._options())
      .pipe(
        map(_ => id)
      );
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
