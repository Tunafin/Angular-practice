import { Injectable } from '@angular/core';

import { Product } from './products';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private items: Product[] = [];

    constructor() {
        this.items = this.createProducts(500);
    }

    //從今天開始依年份季節往回建立產品資料
    private createProducts(amount: number) {
        const seasonsName = ["Spring", "Summer", "Fall", "Winter"]
        const firstYear = 1987;

        let items: Product[] = [];

        let year = new Date().getFullYear();
        let season = Math.floor((new Date().getMonth()) / 3);   //0~3
        let count = amount;

        //建立count，之後判斷count不為零時繼續產生資料，直到count變為零
        //後面判斷amount是否太大，產品最多產生到起始年份為止
        // let count = (amount <= (year - firstYear) * 4 + season + 1)
        //     ? amount
        //     : ((year - firstYear) * 4 + season + 1);

        while (count > 0 && year >= firstYear) {
            while (season >= 0 && count > 0) {
                const rng = Math.floor(Math.random() * 21) * 10 + 600;
                let quarterlySample = {
                    id: year * 100 + season * 3 + 1,
                    name: `Quarterly ${year} ${seasonsName[season]}`,
                    price: rng,
                    description: `This is the quarterly for ${year} ${seasonsName[season]}.`
                }
                items.push(quarterlySample);
                season--;
                count--;
            }
            year--;
            season = 3;
        }
        return items;
    }

    getProducts() {
        return this.items;
    }
}
