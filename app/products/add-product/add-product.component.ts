import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { product } from '../product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  editForm: FormGroup
  constructor(private formBuild: FormBuilder, private router: Router, private route: ActivatedRoute, private productService: ProductServiceService) { }

  ngOnInit() {
    this.form();
  }



  form() {

    this.editForm = this.formBuild.group({
      editCode: [null, [
        Validators.required
      ]],

      editName: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      editURL: [null, [
        Validators.required
      ]],
      editBrand: [null, [
        Validators.required
      ]],
      expiryDate: [null, [
        Validators.required
      ]],
      addDate: [null, [
        Validators.required
      ]],
      type: [null, [
        Validators.required
      ]],
      rate: [null, [
        Validators.required
      ]],
      manufactureDate: [null, [
        Validators.required
      ]],
      editStock: [null, [
        Validators.required
      ]],
      aisle: [null, [
        Validators.required
      ]],
      shelf: [null, [
        Validators.required
      ]],
    })
  }
  get editCode() {
    return this.editForm.get('editCode');
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
  onSaveClick() {
    let proItem: product = {
      proCode: this.editForm.value["editCode"], proName: this.editForm.value["editName"], brand: this.editForm.value["editBrand"], stockCount: this.editForm.value["editStock"], aisle: this.editForm.value["aisle"],
      expiryDate: new Date(this.editForm.value["expiryDate"]), addDate: new Date(this.editForm.value["addDate"]), shelf: this.editForm.value["shelf"], proType: this.editForm.value["type"], rate: this.editForm.value["rate"],
      manufactureDate: new Date(this.editForm.value["manufactureDate"]), image: this.editForm.value["editURL"], quantity: null
    }



    this.productService.productAddition(proItem).subscribe(
      (data) => {
        proItem = data;
        alert('Added Successfully')
        this.router.navigate(['search-bar'])
      });


  }

}

