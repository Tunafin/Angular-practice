import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../products';
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
    product: Product | undefined;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private productsService: ProductsService
    ) { }

    ngOnInit(): void {
        // First get the product id from the current route.
        const routeParams = this.route.snapshot.paramMap;
        const queryParams = this.route.snapshot.queryParamMap;
        const productIdFromRoute = Number(routeParams.get('productId'));

        // Find the product that correspond with the id provided in route.
        this.product = this.productsService.getProducts().find(product => product.id === productIdFromRoute);
    }

    addToCart(product: Product) {
        this.cartService.addToCart(product);
        window.alert('Your product has been added to the cart!');
    }
}
