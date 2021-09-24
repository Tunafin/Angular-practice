import { Product } from './products';

export interface Order {
    id: number,
    name: string,
    address: string,
    contacts: {
        type: string,
        number: string,
    }[]
    time: Date,
    items: Product[],
    total: number
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
