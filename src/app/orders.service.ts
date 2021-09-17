import { Injectable } from '@angular/core';

import { Order } from './orders';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    orders: Order[] = [];

    constructor() {
    }

    addToOrders(order: Order) {
        this.orders.push(order);
    }

    getOrders() {
        return this.orders;
    }

    // private addSample() {
    //     this.orders.push(
    //         {
    //             id: 1,
    //             name: "SampleA",
    //             address: "Tainan City, Taiwan",
    //             contacts: [{ type: "手機", number: "0987654321" }, { type: "市話", number: "02-1234567" }],
    //             time: new Date(),
    //             items: []
    //         }
    //     );
    //     this.orders.push(
    //         {
    //             id: 2,
    //             name: "SampleB",
    //             address: "Office Road, Taipei City, Taiwan",
    //             contacts: [{ type: "手機", number: "0911111111" }],
    //             time: new Date(),
    //             items: [{
    //                 id: 1,
    //                 name: 'Phone XL',
    //                 price: 799,
    //                 description: 'A large phone with one of the best screens'
    //             }, {
    //                 id: 1,
    //                 name: 'Phone XL',
    //                 price: 799,
    //                 description: 'A large phone with one of the best screens'
    //             }]
    //         }
    //     );
    // }
}
