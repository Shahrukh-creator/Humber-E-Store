import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductsService } from 'src/app/services/products.service';

interface Post {
  expiryDate: Date;
}

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  total: number = 0
  data: number[] = []
  saves_address: string = ''
  form: any = FormGroup;

  constructor(private fb: FormBuilder, private dataStore: DataStoreService,
    private productsService: ProductsService) { }

  get f() {
    return this.form.controls;
  }


  ngOnInit(): void {

    //Validation
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      country: ['', [Validators.required]],
      card_type: ['', [Validators.required]],
      card_number: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.min(16), Validators.max(9999999999999999)]],

      card_expiry: ['', [Validators.required]],
      card_cvc: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4)]],

      card_name: ['', [Validators.required, Validators.minLength(3)]],
    });

    // console.log(this.dataStore._cartItems.value);
    for (let i = 0; i < this.dataStore._cartItems.value.length; i++) {

      var str = this.dataStore._cartItems.value[i].price.replace('$', '');
      this.data.push(str);
      this.total = Number(this.data[i]) + this.total;
    }

  }

  add_address() {
    this.saves_address = JSON.stringify(localStorage.getItem('Address'));

    this.saves_address = this.saves_address.replace(/(^"|"$)/g, '')
    console.log("Saved Address: ", this.saves_address);

  }

  submit() {
    console.log("Form Details: ", this.form.value);

    localStorage.setItem('Address', this.form.value.address);

    console.log("Products in the cart: ", this.dataStore._cartItems.value);



    // Sending Total
    console.log("Total: ", this.total);

    this.productsService.setTotal(this.total);

    this.dataStore.clearCart();

  }

}
