import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'https://dev.tuten.cl:443/TutenREST/rest/';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  login(user: User): Observable<User> {
    return this.httpClient.put(
      `${this.AUTH_SERVER_ADDRESS}user/${user.email}`, 
      user, 
      {
        headers: {
            'Accept': 'application/json',
            'App': 'APP_BCK',
            'Password': user.password
        }
    }).pipe(
      tap(async (res: User) => {

        if (res.sessionTokenBck) {
          await this.storage.set("ACCESS_TOKEN", res.sessionTokenBck);
          await this.storage.set("USER_DATA", res);
          //await this.storage.set("EXPIRES_IN", res.user.);
          this.authSubject.next(true);  
        }
      })
    );
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("USER_DATA");
    //await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }
}
