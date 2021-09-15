import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product, products } from '../products';
import { ProductsService } from './../products.service';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    products: Product[];
    testVar: any;

    constructor(
        private router: Router,
        private productsServer: ProductsService,
    ) {
        this.products = this.productsServer.getProducts();
    }

    share() {
        window.alert('The product has been shared!');
    }

    onNotify() {
        window.alert('You will be notified when the product goes on sale.');
    }

    /*
    test(res: any) {
        console.log(res)
    }
    */

    navigate(product: Product) {
        this.router.navigate(['/products', product.id])
        // this.router.navigate([`/products/${product.id}`])
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
