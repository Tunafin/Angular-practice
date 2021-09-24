import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Order } from '../orders';
import { OrdersService } from './../orders.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, AfterViewInit {
    orders: Order[];
    displayedColumns: string[];
    dataSource: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private ordersService: OrdersService,
    ) {
        this.orders = ordersService.getOrders();
        this.displayedColumns = ['time', 'name', 'contacts', 'address', 'items', 'total'];
        this.dataSource = new MatTableDataSource(this.orders);
    }

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
