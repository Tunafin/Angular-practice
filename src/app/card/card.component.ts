import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './../cart.service';
import { Product } from './../products';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() product: Product;
    @Input() isShowShareBtn: boolean;
    @Input() isShowBuyBtn: boolean;

    constructor(
        private router: Router,
        private cartService: CartService,
    ) {
    }

    ngOnInit(): void {
    }

    share(item: Product) {
        window.alert(`The product(${item.name}) has been shared!`);
    }

    onNotify(item: Product) {
        window.alert(`You will be notified when \"${item.name}\" goes on sale!`);
    }

    navigate(product: Product) {
        this.router.navigate(['/products', product.id])
        // this.router.navigate([`/products/${product.id}`])
    }

    addToCart(product: Product) {
        this.cartService.addToCart(product);
        window.alert('Your product has been added to the cart!');
    }
}
