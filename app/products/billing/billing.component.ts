import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { product } from '../product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { bill } from '../purchase-history';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  proList:product[]
  filteredlist:product[]
  searchKey:string
  userList:product[]
  total:number=0;
  contact:string
  submits:boolean=false
  

  constructor(private productService:ProductServiceService, private formBuild:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.userList=[]
    this.productService.productAll().subscribe(
      data =>{ this.proList=data;
        this.filteredlist = data;
        console.log(this.filteredlist)
      });
  }
  newSearch() {
    
    this.filteredlist = this.proList.filter(l => (l.proName.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase())!=-1)||(l.proCode.indexOf(this.searchKey.toLocaleLowerCase())!=-1));
   }
   list(product:product){
     let added: boolean= false;
     console.log(product)
     product.quantity=1;
     this.userList.forEach(element => {
      if(element.proCode.match( product.proCode)){
        added=true;
      }  
     });
if (!added) {
  this.userList.push(product);     
  this.total= this.total + (+product.rate);
}
     
   }
   remove(product:product) {
     if(product.quantity<=1){
       let index = this.userList.indexOf(product);
        this.userList.splice(index,1);
     }
    if(product.quantity > 0) {
      product.quantity--;
      this.total= this.total - (+product.rate); 
    }

  }

  add(product:product) {
    product.quantity++;
    this.total= this.total + (+product.rate); 
  }



  onSaveClick(){
   console.log(this.userList)
   this.userList.forEach(element => {
     this.productService.postBill(this.contact,element.proCode,element.quantity).subscribe(
       data=>{
         console.log(data)
       }
     )
    })
    alert('Billing Success')
  }
}
  
