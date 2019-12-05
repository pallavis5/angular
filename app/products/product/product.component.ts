import { Component, OnInit, Input } from '@angular/core';
import { product } from '../product';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ProductServiceService } from '../product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() filteredlist: product[];
  isAdmin: boolean;


  constructor(private authService: AuthServiceService, private productService: ProductServiceService, private router: Router) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    console.log("delete")

    this.productService.productAll().subscribe(
      data => {
        this.productService.filteredList = data;
        console.log(this.productService.filteredList)
      });
    this.router.navigate(['/search-bar'])
  }
  delete(code: string) {
    this.productService.productDelete(code).subscribe(
      data => {
        this.ngOnInit();


      });
  }

}
