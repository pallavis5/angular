import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { product } from '../product';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {


  editForm: FormGroup
  editProduct: product
  constructor(private formBuild: FormBuilder, private router: Router, private route: ActivatedRoute, private productService: ProductServiceService) { }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('proCode');
    this.productService.productEditList(code).subscribe(
      (data) => {
        this.editProduct = data;
        this.form();
      })
    this.form();
  }
  form() {
    this.editForm = this.formBuild.group({
      editName: [this.editProduct.proName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      editURL: [this.editProduct.image, [
        Validators.required
      ]],
      editBrand: [this.editProduct.brand, [
        Validators.required
      ]],
      expiryDate: [this.editProduct.expiryDate, [
        Validators.required
      ]],
      addDate: [this.editProduct.addDate, [
        Validators.required
      ]],
      type: [this.editProduct.proType, [
        Validators.required
      ]],
      rate: [this.editProduct.rate, [
        Validators.required
      ]],
      manufactureDate: [this.editProduct.manufactureDate, [
        Validators.required
      ]],
      editStock: [this.editProduct.stockCount, [
        Validators.required
      ]],
      aisle: [this.editProduct.aisle, [
        Validators.required
      ]],
      shelf: [this.editProduct.shelf, [
        Validators.required
      ]],
    })
  }

  get editName() {
    return this.editForm.get('editName');
  }
  get editBrand() {
    return this.editForm.get('editBrand');
  }
  get expiryDate() {
    return this.editForm.get('expiryDate');
  }
  get addDate() {
    return this.editForm.get('addDate');
  }
  get aisle() {
    return this.editForm.get('aisle');
  }
  get shelf() {
    return this.editForm.get('shelf');
  }
  get rate() {
    return this.editForm.get('rate');
  }
  get manufactureDate() {
    return this.editForm.get('manufactureDate');
  }
  get editStock() {
    return this.editForm.get('editStock');
  }
  get type() {
    return this.editForm.get('type');
  }
  get editURL() {
    return this.editForm.get('editURL');
  }
  onAddClick() {
    let proItem: product = {
      proCode: this.editProduct.proCode, proName: this.editForm.value["editName"], brand: this.editForm.value["editBrand"], stockCount: this.editForm.value["editStock"], aisle: this.editForm.value["aisle"],
      expiryDate: new Date(this.editForm.value["expiryDate"]), addDate: new Date(this.editForm.value["addDate"]), shelf: this.editForm.value["shelf"], proType: this.editForm.value["type"], rate: this.editForm.value["rate"],
      manufactureDate: new Date(this.editForm.value["manufactureDate"]), image: this.editForm.value["editURL"], quantity: null
    }
    this.productService.productModify(proItem).subscribe(
      (data) => {
        proItem = data;
        this.router.navigate(['search-bar'])
      });


  }

}


