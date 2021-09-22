import { Component } from '@angular/core';

import { Product } from '../products';
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
        private productsServer: ProductsService,
    ) {
        this.products = this.productsServer.getProducts();
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
