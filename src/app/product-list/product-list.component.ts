import { Component, OnDestroy } from '@angular/core';

import { filter, trim } from 'lodash';
import { Subject } from 'rxjs'; //Observable
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Product } from '../products';
import { ProductsService } from './../products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnDestroy {
    products: Product[];
    productsFromFilter: Product[];
    testVar: any;

    //timer: any;

    filterObs = new Subject<string>();
    destorySubject = new Subject();

    constructor(
        private productsServer: ProductsService
    ) {
        this.products = this.productsServer.getProducts();
        this.productsFromFilter = this.products;

        this.filterObs.pipe(debounceTime(300), takeUntil(this.destorySubject)).subscribe(
            res => this.filterProducts(trim(res)),
            error => { }
        )
    }

    ngOnDestroy() {
        this.destorySubject.next();
        this.destorySubject.complete();
        this.filterObs.complete();
    }

    tofilter(input: string) {
        this.filterObs.next(input);
    }

    filterProducts(input: string) {
        this.productsFromFilter = filter(this.products, (product) => {
            const lowerTarget = input?.toLocaleLowerCase();
            return product.description?.toLowerCase().includes(lowerTarget) ||
                product.name?.toLowerCase().includes(lowerTarget) ||
                product.price?.toString().toLowerCase().includes(lowerTarget)
        });
    }

    //使用settimeout
    //------------------------------------------------------
    // filterProducts(input: string) {
    //     let keyword = trim(input);
    //     if (this.timer != null) {
    //         clearTimeout(this.timer);
    //         this.timer = null;
    //     }

    //     this.timer = setTimeout(() => {
    //         this.productsFromFilter = filter(this.products, (product) => {
    //             let isSelected = false;
    //             const values = Object.values(product);
    //             // const valuesTest = filter(values, x => typeof (x) == 'string');
    //             // console.log(valuesTest);
    //             // for (let i = 0; i < values.length; i++) {
    //             //     isSelected = includes(toLower(values[i].toString()), toLower(keyword));
    //             //     if (isSelected) {
    //             //         break;
    //             //     }
    //             // }
    //             return isSelected;
    //         });
    //         this.timer = null;
    //     }, 500);
    // }
    //------------------------------------------------------

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
