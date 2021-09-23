import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CartComponent } from './cart/cart.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CardComponent } from './card/card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({

    //宣告要匯入此模組的外部模組
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ProductListComponent },
            { path: 'products/:productId', component: ProductDetailsComponent },
            { path: 'cart', component: CartComponent },
            { path: 'shipping', component: ShippingComponent },
            { path: 'order-list', component: OrderListComponent },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }  //萬用路由
        ], { relativeLinkResolution: 'legacy' }),
        NoopAnimationsModule
    ],

    //宣告跟View有關的元件
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductListComponent,
        ProductAlertsComponent,
        ProductDetailsComponent,
        CartComponent,
        ShippingComponent,
        OrderListComponent,
        CardComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
