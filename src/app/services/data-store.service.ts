import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { OrderData } from '../models/order.interface';
import { ProductData } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private _products: BehaviorSubject<ProductData[] | any> = new BehaviorSubject(null);
  products$: Observable<ProductData[]> = this._products.asObservable();

  private _orders: BehaviorSubject<OrderData[] | any> = new BehaviorSubject(null);
  orders$: Observable<OrderData[]> = this._orders.asObservable();

  public _cartItems: BehaviorSubject<ProductData[] | any> = new BehaviorSubject([]);
  cartItems$: Observable<ProductData[]> = this._cartItems.asObservable();
  private fullProductList!: ProductData[]


  constructor() { }

  setProducts(products: ProductData[]) {
    this._products.next(products);
  }

  setOrders(orders: OrderData[]) {

    this._orders.next(orders);

  }

  clearCart() {
    this._cartItems.next([]);
  }

  addToCart(item: ProductData) {
    this._cartItems.pipe(
      take(1)
    ).subscribe((cartItems: ProductData[]) => {
      cartItems.push(item);
      this._cartItems.next(cartItems);
      console.log("Added data: ", this._cartItems);
    });
  }

  filterProducts(text: string) {
    this._products.pipe(
      take(1)
    ).subscribe(products => {
      if (text === "") {
        this._products.next(this.fullProductList)
      } else {
        const filteredProducts = products.filter((product: ProductData) => {
          const lowerCaseText = text.toLowerCase();
          const productName = product.name.toLowerCase();
          return productName.includes(lowerCaseText)
        })

        this._products.next(filteredProducts);
      }
    })
  }

  setFullProductsList(products: ProductData[]) {
    this.fullProductList = products;
  }
}
