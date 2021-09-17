import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from '../products';
import { CartService } from '../cart.service';
import { OrdersService } from '../orders.service';
import { Order } from './../orders';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']

})
export class CartComponent implements OnInit {
    items: Product[]
    checkoutForm: FormGroup
    name: FormControl
    address: FormControl
    contacts: FormArray
    //範例寫法，但頻繁call function易造成效率問題
    // get name() { return this.checkoutForm?.get('name') }
    // get address() { return this.checkoutForm?.get('address') }
    // get contacts() {
    //     return this.checkoutForm.get('contacts') as FormArray;
    // }

    constructor(
        private cartService: CartService,
        private ordersService: OrdersService,
        private router: Router
    ) {
        this.items = this.cartService.getItems();
        this.checkoutForm = new FormGroup({
            name: new FormControl('', [Validators.required, this.spaceValidator, Validators.maxLength(5)]),
            address: new FormControl('', [Validators.required, this.spaceValidator, Validators.maxLength(50)]),
            contacts: new FormArray([])
        });
        this.name = this.checkoutForm?.get('name') as FormControl;
        this.address = this.checkoutForm?.get('address') as FormControl;
        this.contacts = this.checkoutForm?.get('contacts') as FormArray;
        this.addContact();

        // 官方文件範例 使用FormBuilder
        // this.checkoutForm = this.formBuilder.group(
        //     {
        //         name: '',
        //         address: ''
        //     }
        // );
    }

    ngOnInit(): void {
    }

    // 官方文件範例的自訂驗證器，使用ValidatorFn
    // forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors | null => {
    //         const forbidden = nameRe.test(control.value);
    //         return forbidden ? { forbiddenName: { value: control.value } } : null;
    //     };
    // }

    //自訂驗證器，ValidationErrors
    spaceValidator(control: AbstractControl): ValidationErrors | null {
        const spaceError = /^\s+$/.test(control.value);
        return spaceError ? { isAllSpace: true } : null;
    }

    addContact() {
        this.contacts.push(
            new FormGroup({
                type: new FormControl('手機', [Validators.required]),
                number: new FormControl('', [Validators.required, this.spaceValidator, Validators.pattern('[0-9]{1,10}')])
            })

        );
    }

    //若欄位驗證錯誤，回傳錯誤訊息
    getErrorMsg(control: AbstractControl) {
        const errors = control.errors;
        if (errors == null) {
            return null;
        };
        const errorKeys = Object.keys(errors);
        const firstErrorKey = errorKeys[0];
        //const value = errors['firstErrorKey'];
        switch (firstErrorKey) {
            case 'required':
                return '必填';
            case 'isAllSpace':
                return '不能全部空白';
            case 'maxlength':
                return `最大長度為${errors[firstErrorKey]['requiredLength']}`;
            case 'minlength':
                return `最小長度為${errors[firstErrorKey]['requiredLength']}`;
            case 'pattern':
                return '格式不符';
            default:
                return '---';
        }
    }

    removeContact(idx: number) {
        this.contacts.removeAt(idx);
    }

    onSubmit() {
        console.log("'Purchase' is clicked. The infornation of user is below:");
        console.log(this.checkoutForm.value);
        // if (this.checkoutForm.valid == true)
        //     console.log("Valid Pass!");
        // else
        //     console.log("Valid Fail!");
        this.items = this.cartService.clearCart();
        this.checkoutForm.reset();
        window.alert("Order saved. The cart has been cleared and reset.");
    }

    addToOrders() {
        const timeNow = new Date();
        let orderSample: Order = {
            id: null,
            name: this.checkoutForm.get('name').value,
            address: this.checkoutForm.get('address').value,
            contacts: this.checkoutForm.get('contacts').value,
            time: new Date(),
            items: this.items
        };
        this.ordersService.addToOrders(orderSample);
        this.items = this.cartService.clearCart();
        this.checkoutForm.reset();
        window.alert("Cart has been cleared and reset.");
        this.router.navigateByUrl("/order-list");
    }

    // updateSample() {
    //     //使用setValue() 方法的嚴格檢查可以幫助捕獲複雜表單巢狀中的錯誤
    //     this.checkoutForm.setValue({
    //         name: 'test',
    //         address: {
    //             country: 'Taiwan',
    //             city: 'Tainan',
    //             street: '123 Drew Road'
    //         },
    //         numbers: ['132456']
    //     })

    //     // setValue()其他寫法
    //     // this.checkoutForm.controls.name.setValue('Nancy');
    //     // (this.checkoutForm.controls.address as FormGroup).controls.city.setValue('Taipei');
    //     // (this.checkoutForm.controls.numbers as FormArray).controls[0].setValue('0911122233');

    //     //使用patchValue()，較不嚴謹
    //     // this.checkoutForm.patchValue({
    //     //     address: {
    //     //         country: 'Taiwan',
    //     //         //city: 'Tainan',
    //     //         street: '123 Drew Road'
    //     //     }
    //     // })
    // }
}
