import { Component, OnInit } from '@angular/core';

import { Order } from '../orders';
import { OrdersService } from './../orders.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    orders: Order[];

    constructor(
        private ordersService: OrdersService
    ) {
        this.orders = ordersService.getOrders();
    }

    ngOnInit(): void {
    }

}
