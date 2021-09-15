import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

//import { CartComponent } from './../cart/cart.component';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
    shippingCosts = this.cartService.getShippingPrices();

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
    }

}
