import { environment } from './../../environments/environment';
//^ important that its /enviroment angular will pick based on ng build --?
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //get enviroment varable whether prod or dev
  backgroundColor = environment.navBarBackgroundColor;

  constructor(public authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    console.log(this.authService.currentUser);
    this.authService.isLoggedIn();
    this.orderService.getOrders()
      .subscribe(response => {
        console.log(response);
      })
  }

}
