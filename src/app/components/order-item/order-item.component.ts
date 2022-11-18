import { Component, Input, OnInit } from '@angular/core';
import { OrderData } from 'src/app/models/order.interface';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order!: OrderData;
  constructor() { }

  ngOnInit(): void {
  }

}
