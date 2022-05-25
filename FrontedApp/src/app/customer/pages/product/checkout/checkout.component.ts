import { UsercouponService } from './../../../../service/usercoupon.service';
import { Usercoupon } from 'src/app/models/usercoupon';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { Order } from 'src/app/models/order';
import { Orderdetail } from 'src/app/models/orderdetail';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/service/book.service';
import { CouponService } from 'src/app/service/coupon.service';
import { Book } from 'src/app/models/book';
import { Coupon } from 'src/app/models/coupon';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  book: Book = new Book();
  order: Order = new Order();
  coupon: Coupon = new Coupon();
  orderDetail: Orderdetail = new Orderdetail();
  userCoupon: Usercoupon = new Usercoupon();
  acc: any = localStorage.getItem('user');
  account: any = JSON.parse(this.acc);
  cartItems: any = sessionStorage.getItem('cart');
  cartItems2: any = JSON.parse(this.cartItems);
  shopCart: any = sessionStorage.getItem('cart') != null ? this.cartItems2 : [];
  cart: any = [];
  listCouponUser: any = [];
  couponUsed: any = sessionStorage.getItem('coupon');
  usedDiscountCoupon: any = JSON.parse(this.couponUsed);
  totalPriceCart: number = 0;
  subToTalPrice: number = 0;
  infoFo = this.fb.group({
    note: [''],
    name: [this.account.name],
    phone: [this.account.phone],
    address: [this.account.address]
  });
  constructor(
    private usercouponService: UsercouponService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private orderDetailService: OrderdetailService,
    private router: Router,
    private toastr: ToastrService,
    private bookService: BookService,
    private couponService: CouponService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('vi');
    this.translate.use(localStorage.getItem('language') || 'vi');
  }

  ngOnInit(): void {
    this.cart = this.shopCart;
    console.log(this.shopCart);
    this.getDataUserCoupon();
    this.total();
  }
  getDataUserCoupon() {
    this.usercouponService
      .findListCouponUser(this.account.id)
      .subscribe((data) => {
        this.listCouponUser = data;
      });
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
    this.subToTalPrice = a + b + c;
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
  insertOrder() {
    this.order.objAccountOrder = this.account;
    this.order.objOrderCoupon = this.usedDiscountCoupon;
    this.order.subtotalprice = this.subToTalPrice;
    this.order.note = this.infoFo.controls['note'].value;
    this.order.name = this.infoFo.controls['name'].value;
    this.order.address = this.infoFo.controls['address'].value;
    this.order.phone = this.infoFo.controls['phone'].value;
    this.order.status = 0;
    this.orderService.insertOrder(this.order).subscribe((data) => {
      for (let i = 0; i < this.shopCart.length; i++) {
        this.orderDetail.objBookOrder = this.shopCart[i];
        this.orderDetail.objOrder = data;
        if (this.shopCart[i].saleprice != null && this.shopCart[i].type) {
          this.orderDetail.price =
            this.shopCart[i].price -
            (this.shopCart[i].price * this.shopCart[i].saleprice) / 100;
        } else if (
          this.shopCart[i].saleprice != null &&
          !this.shopCart[i].type
        ) {
          this.orderDetail.price =
            this.shopCart[i].price - this.shopCart[i].saleprice;
        } else {
          this.orderDetail.price = this.shopCart[i].price;
        }
        this.orderDetail.quantity = this.shopCart[i].qty;
        console.log(this.orderDetail);
        if (this.usedDiscountCoupon != null) {
          this.usercouponService
            .findCouponUser(this.usedDiscountCoupon.id, this.account.id)
            .subscribe((dt) => {
              this.userCoupon.objCouponUser = dt.objCouponUser;
              this.userCoupon.objUserCoupon = dt.objUserCoupon;
              this.userCoupon.status = 0;
              this.usercouponService
                .updateUserCoupon(dt.id, this.userCoupon)
                .subscribe((result) => {});
            });
          this.couponService
            .findCouponById(this.usedDiscountCoupon.id)
            .subscribe((d) => {
              this.coupon = d;
              this.coupon.quantity = d.quantity - 1;
              console.log(this.coupon);
              this.couponService
                .updateCoupon(d.id, this.coupon)
                .subscribe((result) => {});
            });
        }
        this.bookService.findBookById(this.shopCart[i].id).subscribe((book) => {
          this.book = book;
          this.book.quantity = book.quantity - this.shopCart[i].qty;
          this.bookService
            .updateBook(this.shopCart[i].id, this.book)
            .subscribe((a) => {});
        });
        this.orderDetailService
          .insertOrderdetail(this.orderDetail)
          .subscribe((res) => {});
      }
      sessionStorage.removeItem('coupon');
      sessionStorage.removeItem('cart');
      this.toastr.success(this.translate.instant(`successOrder`))
      this.router.navigate(['thanks']);
    },
    err=>this.toastr.error(this.translate.instant(`errOrder`)));
  }
}
