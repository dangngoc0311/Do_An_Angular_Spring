import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Coupon } from 'src/app/models/coupon';
import { BookService } from 'src/app/service/book.service';
import { CouponService } from 'src/app/service/coupon.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  book: Book = new Book();
  coupon: Coupon = new Coupon();
  listBookUpdateAuto!: Array<any>;
  listCouponUpdateAuto!: Array<any>;
  sortColumn = 'id';
  sortOrder = 'DESC';
  categoryId = '';
  constructor(
    private couponService: CouponService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.getDataBookUpdateAuto();
    this.getDataCouponUpdateAuto();
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
            if (this.listBookUpdateAuto[index].quantity == 0&& this.listBookUpdateAuto[index].status ==1) {
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
}
