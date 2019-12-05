import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { AuthServiceService } from 'src/app/auth-service.service';
import { bill } from '../purchase-history';
import { element } from 'protractor';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  list: bill[]
  filterList: bill[]
  date: Date = null
  billTotal: number = 0
  constructor(private productService: ProductServiceService, private authService: AuthServiceService) { }

  ngOnInit() {
    this.productService.getBill(this.authService.userid).subscribe(
      data => {
      this.list = data;

        this.filterList = data;
        console.log(this.filterList)
        this.total();

        console.log(this.billTotal)
      }
    )
  }
  trackDate() {
    if (this.date.toLocaleString().length == 0) {
      this.filterList = this.list;
      this.total();
    }
    else {
      this.filterList = this.list.filter(bill => this.date.toLocaleString().match(bill.billDate.toLocaleString()));
      this.total();
    }
  }
  total() {
    this.billTotal = 0;
    this.filterList.forEach(element => {
      this.billTotal = this.billTotal + (element.quantity * (+element.product.rate));
    });
  }

}
