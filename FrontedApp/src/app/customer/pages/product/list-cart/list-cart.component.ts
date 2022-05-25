import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/service/coupon.service';
import { UsercouponService } from 'src/app/service/usercoupon.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.css'],
})
export class ListCartComponent implements OnInit {
  // account: any = localStorage.getItem('user');
  // accountId: any = JSON.parse(this.account).id;
  // cart: any = [];
  // host: string = 'http://localhost:8081/admin/book';
  //ADD CART USING sessionStorage
  cartItems: any = sessionStorage.getItem('cart');
  cartItems2: any = JSON.parse(this.cartItems);
  shopCart: any = sessionStorage.getItem('cart') != null ? this.cartItems2 : [];
  cart: any = [];
  host: string = 'http://localhost:8081/admin/book';
  totalPriceCart: number = 0;
  listCouponUser: any = [];
  acc: any = localStorage.getItem('user');
  account: any = JSON.parse(this.acc);
  couponUsed: any = sessionStorage.getItem('coupon');
  usedDiscountCoupon: any = JSON.parse(this.couponUsed);
  //END ADD CART USING sessionStorage
  constructor(
    private usercouponService: UsercouponService,
    private couponService: CouponService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    //ADD CART USING sessionStorage
    if (this.shopCart.length == 0) {
      sessionStorage.removeItem('coupon');
    }
    this.total();
    if (this.totalPriceCart < 0) {
      this.totalPriceCart = 0;
    }

    for (let index = 0; index < this.shopCart.length; index++) {
      if (this.shopCart[index].qty >= this.shopCart[index].quantity) {
        this.shopCart[index].qty = this.shopCart[index].quantity;
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
    this.cart = this.shopCart;
    this.getDataUserCoupon();
  }

  //ADD CART USING sessionStorage
  minus(id: any) {
    for (let i = 0; i < this.shopCart.length; i++) {
      if (id == this.shopCart[i].id) {
        this.cart[i].qty -= 1;
        if (this.cart[i].qty == 0) {
          this.cart.splice(i, 1);
        }
      }
    }
    this.ngOnInit();
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    this.toastr.success(this.translate.instant(`successUpdate`));
  }
  plus(id: any) {
    for (let i = 0; i < this.shopCart.length; i++) {
      if (id == this.shopCart[i].id) {
        if (this.cart[i].qty < this.shopCart[i].quantity) {
          this.cart[i].qty += 1;
        } else {
          this.cart[i].qty = this.shopCart[i].quantity;
        }
      }
    }
    this.ngOnInit();
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    this.toastr.success(this.translate.instant(`successUpdate`));
  }
  remove(id: any) {
    for (let i = 0; i < this.shopCart.length; i++) {
      if (id == this.shopCart[i].id) {
        this.shopCart.splice(i, 1);
      }
    }
    this.ngOnInit();
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
    this.toastr.success(this.translate.instant(`successUpdate`));
  }
  removeAll() {
    this.shopCart = sessionStorage.clear();
    this.ngOnInit();
    this.toastr.success(this.translate.instant(`successUpdate`));
  }
  useCouponUser(value: any) {
    sessionStorage.removeItem('coupon');
    this.couponService.findCouponById(value).subscribe((data) => {
      sessionStorage.setItem('coupon', JSON.stringify(data));
      location.reload();
      this.total();
      this.toastr.success(this.translate.instant(`successCoupon`));
    });
  }

  //ADD CART USING sessionStorage
  getDataUserCoupon() {
    if (this.acc != null) {
      this.usercouponService
        .findListCouponUser(this.account.id)
        .subscribe((data) => {
          this.listCouponUser = data;
        });
    }
  }
  total() {
    var a = 0;
    var b = 0;
    var c = 0;
    for (let i = 0; i < this.shopCart.length; i++) {
      if (this.shopCart[i].saleprice != null && this.shopCart[i].typesale) {
        a +=
          (this.shopCart[i].price -
            (this.shopCart[i].saleprice * this.shopCart[i].price) / 100) *
          this.shopCart[i].qty;
      } else if (
        this.shopCart[i].saleprice != null &&
        !this.shopCart[i].typesale
      ) {
        c +=
          (this.shopCart[i].price - this.shopCart[i].saleprice) *
          this.shopCart[i].qty;
      } else {
        b += this.shopCart[i].price * this.shopCart[i].qty;
      }
    }
    if (this.usedDiscountCoupon != null) {
      if (this.usedDiscountCoupon.type) {
        this.totalPriceCart =
          a +
          b +
          c -
          ((a + b + c) * this.usedDiscountCoupon.discountvalue) / 100;
      } else {
        this.totalPriceCart = a + b + c - this.usedDiscountCoupon.discountvalue;
      }
    } else {
      this.totalPriceCart = a + b + c;
    }
  }
}
