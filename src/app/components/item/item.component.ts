import { Component, Input, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/product.interface';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() product!: ProductData;

  constructor(private dataStore: DataStoreService) { }

  ngOnInit(): void {
    const data = this.dataStore._cartItems;
    // console.log("Saved cart: ", data);
  }

  addToCart(product: ProductData) {
    this.dataStore.addToCart(product);
  }

}
