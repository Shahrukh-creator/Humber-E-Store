import { Component, Input, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/product.interface';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item!: ProductData;
  constructor() { }

  ngOnInit(): void {
  }

}
