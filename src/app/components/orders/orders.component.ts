import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderData } from 'src/app/models/order.interface';
import { DataStoreService } from 'src/app/services/data-store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders!: OrderData[];

  object_array: any[] = []
  // selected_orders_ = {}

  ordersSubscription!: Subscription;
  constructor(private dataStore: DataStoreService, private productsService: ProductsService) { }

  ngOnInit(): void {
    // console.log("Current Orders In Orders Component: ", this.dataStore._cartItems.value);
    console.log("Total Sum In Orders Component: ", this.productsService.total_sum);
    // console.log("Random Number: ", Math.floor(Math.random() * (100000 + 1)));

    // this.selected_orders_.push(Math.floor(Math.random() * (100000 + 1)), this.productsService.total_sum);

    let order_data =
    {
      "orderNumber": Math.floor(Math.random() * (100000 + 1)),
      "total": '$' + this.productsService.total_sum
    }

    // this.object_array.push(order_data);

    // console.log("Selected order: ", this.object_array);


    this.productsService.getOrderData(order_data);

    this.ordersSubscription = this.dataStore.orders$.subscribe(orders => {
      this.orders = orders;
    })
    console.log("Order: ", this.orders);

  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
