import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/service/coupon.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEnGb from '@angular/common/locales/en-GB';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.css'],
})
export class ListCouponComponent implements OnInit {
  public listCoupon!: Array<any>;
  public pages!: Array<any>;
  pageNumber: number = 0;
  pageSize: number = 4;
  searchValue = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  constructor(
    private couponService: CouponService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public translate: TranslateService
  ) {}
  searchForm = this.fb.group({
    search: [''],
  });
  ngOnInit(): void {
    this.getDataCoupon();
    registerLocaleData(localeIt, 'it-IT');
    registerLocaleData(localeEnGb, 'en-GB');
  }
  getDataCoupon(): void {
    this.couponService
      .getAllCoupons(
        this.pageNumber,
        this.pageSize,
        this.searchValue,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe(
        (response) => {
          this.listCoupon = response['content'];
          this.pages = new Array(response['totalPages']);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  setPageNumber(i: any, event: any) {
    event.preventDefault();
    this.pageNumber = i;
    this.getDataCoupon();
  }
  setPageSize(value: any) {
    this.pageSize = value;
    this.getDataCoupon();
  }
  sortBy(column: any, order: any) {
    this.sortColumn = column;
    this.sortOrder = order;
    this.getDataCoupon();
  }
  searchCoupon() {
    this.searchValue = this.searchForm.controls['search'].value;
    this.getDataCoupon();
  }
  deleteCoupon(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.couponService.deleteCoupon(id).subscribe(
          (res) => {
            this.getDataCoupon();
            this.toastr.success(this.translate.instant(`successDelete`))
          },
          (err) =>this.toastr.error(this.translate.instant(`errDelete`))
        );
      }
    });
  }
}
