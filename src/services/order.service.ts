import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { AuthHttpService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: Http,
    //private authHttp: AuthHttpService
  ) { }

  getOrders() {
    // adding header to http requests 
    let headers = new Headers();

    // get token from local storage
    let token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);

    let options = new RequestOptions({ headers: headers });

    return this.http.get('/api/order', options).map(response => response.json());

    // authHttp automatically goes all steps above
    // so we dont 
    //return this.authHttp.get('/api/order').map(response => response.json());
  }

}
