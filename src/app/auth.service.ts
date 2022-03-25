import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userName: string = ``;
  baseURL: string = 'https://routeegypt.herokuapp.com/';
  constructor(public _HttpClient: HttpClient) {}

  signUp(data: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signup', data);
  }
  signIn(data: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signin', data);
  }
  signOut(data: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signOut', data);
  }

  isLogIn() {
    return !!localStorage.getItem('TOKEN');
  }
}
