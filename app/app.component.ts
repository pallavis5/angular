import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { ProductServiceService } from './products/product-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'smartshop';

  constructor(private authService: AuthServiceService, private router: Router, private productService: ProductServiceService) {

  }
  ngOnInit() {
    this.router.navigate(['/search-bar']);
  }

  isLoggedIn: boolean = false;



  loggedIn(): boolean {
    if (!this.authService.loggedInUser.loggedOut) {
      this.isLoggedIn = true;
      return true
    }
    else {
      this.isLoggedIn = false;

      return false;
    }
  }


}
