import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any;
  subscription!: Subscription;

  constructor(private productsService: ProductsService, private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.productsService.getProducts();
    // this.productsService.getOrderData();

    this.subscription = this.dataStore.products$.subscribe(products => {
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
