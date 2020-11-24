import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Ride } from '../interfaces/ride';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private readonly _backendURL: any;
  private readonly _defaultRide: Ride;

  constructor(private _http: HttpClient) {

    this._defaultRide = {
      driver: '5fb86395eecced2dd69c382e',
      start: {
        street: 'rue de Stanislas',
        postalCode: '54000',
        city: 'Nancy',
      },
      finish: {
        street: 'rue de la Gare',
        postalCode: '54000',
        city: 'Nancy',
      },
      duration: 4,
      price: 15.99,
      date: '1991-09-19 22:00:00.000Z'
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

  get defaultRide(): Ride {
    return this._defaultRide;
  }

  fetch(): Observable<Ride[]> {
    return this._http.get<Ride[]>(this._backendURL.allRides)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  fetchOne(id: string): Observable<Ride> {
    return this._http.get<Ride>(this._backendURL.oneRide.replace(':id', id));
  }

  fetchBeginEnd(begin: string, end: string): Observable<Ride>{
    return this._http.get<Ride>(this._backendURL.beginendride.replace({':start': begin}, {':end': end}));
  }

  create(ride: Ride): Observable<any> {
    return this._http.post<Ride>(this._backendURL.allRides, ride, this._options());
  }

  update(id: string, ride: Ride): Observable<any> {
    return this._http.put<Ride>(this._backendURL.oneRide.replace(':id', id), ride, this._options());
  }

  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneRide.replace(':id', id))
      .pipe(
        map(_ => id)
      );
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
