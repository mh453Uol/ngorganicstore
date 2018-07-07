import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) { }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
      .map(response => {
        let body = response.json();
        if (body && body.token) {
          // add token to local storage
          localStorage.setItem('token', body.token);
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // this fucntion is provided by jwt
    // it checks for a token 
    // that is not expired!
    // return tokenNotExpired();

    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    console.log(token);
    // token is null or empty
    if (!token) {
      return false;
    }
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    console.log(expirationDate, isExpired);
    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    // token is null 
    if (!token) { return null; }

    return new JwtHelperService().decodeToken(token);
  }
}
