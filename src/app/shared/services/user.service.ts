import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import { User } from '../interfaces/user';
import { defaultIfEmpty, filter, map } from 'rxjs/operators';
import { PEOPLE } from '../../_static/people';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default person
  private readonly _defaultUser: User;

  private _users: User[];

  constructor(private _http: HttpClient) {
    this._users = PEOPLE;

    this._defaultUser = {
      firstname: 'firstname',
      lastname: 'lastname',
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      age: 0,
      email: 'email@ema.il',
      phone: '1234567890',
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

  /**
   * Returns private property _defaultPerson
   */
  get defaultPerson(): User {
    return this._defaultUser;
  }

  /**
   * Function to return list of person
   */
  fetch(): User[] {
    return this._users;
  }

  /**
   * Function to return one person for current id
   */
  fetchOne(id: string): User {
    return this._users.find(x => x.id == id);
  }


  /**
   * Function to create a new person
   */
  create(person: User): Observable<any> {
    return this._http.post<User>(this._backendURL.allPeople, person, this._options());
  }

  /**
   * Function to update one person
   */
  update(id: string, person: User): Observable<any> {
    return this._http.put<User>(this._backendURL.onePeople.replace(':id', id), person, this._options());
  }

  /**
   * Function to delete one person for current id
   */
  delete(id: string): void {
    this._users = this._users.filter(ride => ride.id !== id);

  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
