import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';

//import { CartComponent } from './../cart/cart.component';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

    constructor(private cartService: CartService) { }

    shippingCosts = this.cartService.getShippingPrices();

    ngOnInit(): void {
    }

}
