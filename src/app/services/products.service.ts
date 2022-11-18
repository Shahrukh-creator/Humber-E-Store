import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { OrderData } from '../models/order.interface';
import { ProductData } from '../models/product.interface';
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  orders!: OrderData[];
  total_sum: number = 0

  public _selected_orders: BehaviorSubject<ProductData[] | any> = new BehaviorSubject([]);
  _selected_orders$: Observable<ProductData[]> = this._selected_orders.asObservable();

  constructor(private http: HttpClient, private dataStore: DataStoreService) {
  }

  getProducts() {
    this.http.get<ProductData[]>('/assets/product-data.json').pipe(
      take(1)
    ).subscribe((res: ProductData[]) => {
      this.dataStore.setFullProductsList(res);
      this.dataStore.setProducts(res);
    })
  };

  setTotal(total: any) {
    this.total_sum = total;
    console.log("Total Sum in Product Service: ", this.total_sum);

  }

  getOrderData(selected_orders_: any) {
    this.http.get<OrderData[]>('/assets/order-data.json').pipe(
      take(1)
    ).subscribe((res: OrderData[]) => {
      if (this.total_sum != 0) {
        res.push(selected_orders_);
      }
      this.dataStore.setOrders(res);
    })
  }

  clearCart() {
    this.dataStore.clearCart();
  }

  addToCart(item: ProductData) {
    this.dataStore.addToCart(item);
  }
}
