import { User } from './../auth/user';
import { BookingResponse } from './booking-response';
import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  AUTH_SERVER_ADDRESS: string = 'https://dev.tuten.cl:443/TutenREST/rest/';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  getAll(user: User): Observable<Booking[]> {
    return this.httpClient.get(
      `${this.AUTH_SERVER_ADDRESS}user/contacto@tuten.cl/bookings?current=true`,       
      {
        headers: {
          'Accept': 'application/json',
          'App': 'APP_BCK',
          'Adminemail': user.email,                  
          'Token': user.sessionTokenBck
        }
      }).pipe(
        tap(async (res: Booking[]) => {

          if (res) {
            //await this.storage.set("ACCESS_TOKEN", res.user.sessionTokenBck);
            //await this.storage.set("EXPIRES_IN", res.user.);
            this.authSubject.next(true);
          }
        })
      );
  }
}
