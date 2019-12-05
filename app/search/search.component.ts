import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../products/product-service.service';
import { product } from '../products/product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKey: string
  proList: product[]


  constructor(private productService: ProductServiceService, private router: Router) { }

  ngOnInit() {
    console.log("search");

    this.productService.productAll().subscribe(
      data => {
      this.proList = data;
        this.productService.filteredList = data;
        console.log(this.productService.filteredList)
      });



    this.productService.productTypeList().subscribe(
      data => {
        console.log(data)
        this.productService.types = data;
      });


    console.log(this.productService.types);


  }

  search() {

    this.productService.filteredList = this.proList.filter(l => l.proName.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase()) != -1);

  }
  products(type: string) {

    console.log(type);

    this.productService.productList(type).subscribe(
      data => {
      this.proList = data;
        this.productService.filteredList = data;
      });
    console.log(this.productService);

  }

}
