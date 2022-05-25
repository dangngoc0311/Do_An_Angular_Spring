import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { Coupon } from 'src/app/models/coupon';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import { CouponService } from 'src/app/service/coupon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listBookUpdateAuto!: Array<any>;
  listCouponUpdateAuto!: Array<any>;
  book: Book = new Book();
  coupon: Coupon = new Coupon();
  categoryId = '';
  listBook!: Array<any>;
  listCate: any = [];
  host: string = 'http://localhost:8081/admin/book';
  cartItems: any = sessionStorage.getItem('cart');
  cartItems2: any = JSON.parse(this.cartItems);
  shopCart: any = sessionStorage.getItem('cart') != null ? this.cartItems2 : [];
  sortColumn = 'id';
  sortOrder = 'DESC';
  pageNumber: number = 0;
  pageSize: number = 8;
  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private couponService: CouponService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('vi');
    this.translateService.use(localStorage.getItem('language') || 'vi');
  }

  ngOnInit(): void {
    this.getDataBookUpdateAuto();
    this.getDataCouponUpdateAuto();
    this.getDataBook();
    this.getDataCategory();
  }
  getDataCategory(): void {
    this.categoryService.getCategoryByStatus().subscribe(
      (response: Category[]) => {
        this.listCate = response;
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
  getDataBook(): void {
    this.bookService
      .getAllBooks(
        this.pageNumber,
        this.pageSize,
        '',
        this.categoryId,
        '',
        '',
        this.sortColumn,
        this.sortOrder
      )
      .subscribe(
        (response) => {
          this.listBook = response['content'];
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  findBookByCateId(id: any) {
    this.categoryId = id;
    this.getDataBook();
  }
  loadMore(){
    this.pageSize = this.pageSize+6;
    this.getDataBook();
  }
  err(name: string) {
    this.toastr.error('San pham ' + name + ' da het');
  }
  getDataBookUpdateAuto(): void {
    this.bookService
      .getAllBooks(
        0,
        1000,
        '',
        this.categoryId,
        '',
        '',
        this.sortColumn,
        this.sortOrder
      )
      .subscribe(
        (response) => {
          this.listBookUpdateAuto = response['content'];
          for (let index = 0; index < this.listBookUpdateAuto.length; index++) {
            if (
              this.listBookUpdateAuto[index].quantity == 0 &&
              this.listBookUpdateAuto[index].status == 1
            ) {
              this.bookService
                .findBookById(this.listBookUpdateAuto[index].id)
                .subscribe((book) => {
                  this.book = book;
                  this.book.status = 0;
                  this.bookService
                    .updateBook(this.book.id, this.book)
                    .subscribe((data) => {});
                });
            }
          }
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  getDataCouponUpdateAuto(): void {
    let today = new Date().toISOString().slice(0, 10);
    this.couponService
      .getAllCoupons(0, 100, '', this.sortColumn, this.sortOrder)
      .subscribe((data) => {
        this.listCouponUpdateAuto = data['content'];

        for (let index = 0; index < this.listCouponUpdateAuto.length; index++) {
          if (
            this.listCouponUpdateAuto[index].startdate <= today &&
            today <= this.listCouponUpdateAuto[index].enddate
          ) {
            this.coupon = this.listCouponUpdateAuto[index];
            this.coupon.status = 1;
            this.couponService
              .updateCoupon(this.coupon.id, this.coupon)
              .subscribe((dat) => {});
          } else {
            this.coupon = this.listCouponUpdateAuto[index];
            this.coupon.status = 0;
            this.couponService
              .updateCoupon(this.coupon.id, this.coupon)
              .subscribe((daat) => {});
          }
        }
      });
  }
  addToCart(id: any) {
    var check = this.checkproduct(this.listBook, id);
    let demo = this.checkcart(this.shopCart, id);
    if (demo >= 0) {
      if (this.shopCart[demo].qty >= this.shopCart[demo].quantity) {
        this.shopCart[demo].qty == this.shopCart[demo].quantity;
      } else {
        this.shopCart[demo].qty += 1;
      }
      sessionStorage.setItem('cart', JSON.stringify(this.shopCart));
      this.toastr.success('Them thanh cong');
    } else {
      check.qty = 1;
      this.shopCart.push(check);
      sessionStorage.setItem('cart', JSON.stringify(this.shopCart));
      this.toastr.success('Them thanh cong');
    }
  }
  checkproduct(pro: any, id: any) {
    for (let index = 0; index < pro.length; index++) {
      if (pro[index].id == id) {
        return pro[index];
      }
    }
    return false;
  }

  checkcart(cart: any, id: any) {
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].id == id) {
        return index;
      }
    }
    return -1;
  }
}
