import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { RIDES } from '../../_static/rides';
import { Ride } from '../interfaces/ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  // private property to store default person
  private readonly _defaultRide: Ride;

  private _rides: Ride[];

  constructor(private _http: HttpClient) {
    this._rides = RIDES;

    this._defaultRide = {
      id: 'id',
      driver: 'driver',
      clients: [
        'client1'
      ],
      start: {
        street: 'start',
        postalCode: '000',
        city: '---'
      },
      finish: {
        street: 'finish',
        postalCode: '54000',
        city: 'Nancy'
      },
      duration: 0.0,
      price: 0.0,
      stops: [
        {
          street: 'stop1',
          postalCode: '000',
          city: '---'
        }
      ],
      nbSeats: 0,
      date: 0
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
  get defaultPerson(): Ride {
    return this._defaultRide;
  }

  /**
   * Function to return list of person
   */
  fetch(): Ride[] {
    return this._rides;
  }

  /**
   * Function to return one person for current id
   */
  fetchOne(id: string): Ride {
    return this._rides.find(x => x.id == id);
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
    this._rides = this._rides.filter(ride => ride.id !== id);
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
