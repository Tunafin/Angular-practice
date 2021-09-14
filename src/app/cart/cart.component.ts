import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Product } from '../products';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']

})

export class CartComponent implements OnInit {

    items: Product[]
    checkoutForm: FormGroup

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
    ) {
        this.items = this.cartService.getItems();

        // 練習用
        // this.checkoutForm = new FormGroup({
        //     name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        //     address: new FormGroup({
        //         country: new FormControl({ value: 'Taiwan', disabled: true }),
        //         //country: new FormControl('Taiwan', [Validators.required]),
        //         city: new FormControl('', [Validators.required]),
        //         street: new FormControl('', [Validators.required])
        //     }),
        //     numbers: new FormArray([])
        // });
        // this.AddNumber();

        // 官方文件範例 使用FormBuilder
        this.checkoutForm = this.formBuilder.group(
            {
                name: '',
                address: ''
            }
        );
    }

    ngOnInit(): void {
    }

    //get name() { return this.checkoutForm.get('name') }
    //get address() { return this.checkoutForm.get('address') }
    // get numbers() {
    //     return this.checkoutForm.get('numbers') as FormArray;
    // }

    //官方文件範例寫的自訂驗證器
    // forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors | null => {
    //         const forbidden = nameRe.test(control.value);
    //         return forbidden ? { forbiddenName: { value: control.value } } : null;
    //     };
    // }

    //自訂驗證器另一種寫法
    // testValidator(control: AbstractControl): ValidationErrors | null {
    //     const forbidden = /bob/i.test(control.value);
    //     return forbidden ? { forbiddenName: { value: control.value } } : null;
    // }

    // AddNumber() {
    //     this.numbers.push(new FormControl('', [Validators.required, Validators.pattern('[0-9]{6,10}')]));
    // }

    // RemoveNumber(idx: number) {
    //     this.numbers.removeAt(idx);
    // }

    onSubmit() {
        console.log("'Purchase' is clicked. The infornation of user is below:");
        console.log(this.checkoutForm.value);

        // if (this.checkoutForm.valid == true)
        //     console.log("Valid Pass!");
        // else
        //     console.log("Valid Fail!");
        this.items = this.cartService.clearCart();
        this.checkoutForm.reset();
        window.alert("Cart has been cleared and reset.");
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

    //     //使用patchValue()
    //     // this.checkoutForm.patchValue({
    //     //     address: {
    //     //         country: 'Taiwan',
    //     //         //city: 'Tainan',
    //     //         street: '123 Drew Road'
    //     //     }
    //     // })
    // }
}
