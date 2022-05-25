import { UsercouponService } from './../../../../service/usercoupon.service';
import { CouponService } from 'src/app/service/coupon.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { HttpErrorResponse } from '@angular/common/http';
import { Usercoupon } from 'src/app/models/usercoupon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-usercoupon',
  templateUrl: './usercoupon.component.html',
  styleUrls: ['./usercoupon.component.css'],
})
export class UsercouponComponent implements OnInit {
  public listCouponExpired?: Coupon[];
  userCoupon: Usercoupon = new Usercoupon();
  acc: any = localStorage.getItem('user');
  account: any = JSON.parse(this.acc);
  listUserCoupon: Usercoupon[] = [];
  checkUserCouponE: any = false;
  constructor(
    private couponService: CouponService,
    private usercouponService: UsercouponService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.getCouponExpired();

  }
  getCouponExpired() {
    this.couponService.getAllExpiredCoupons(this.account.id).subscribe(
      (response: Coupon[]) => {
        this.listCouponExpired = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
  insertUserCoupon(id: any) {
    this.userCoupon.status = true;
    this.userCoupon.objUserCoupon = this.account;
    this.couponService.findCouponById(id).subscribe((data) => {
      this.userCoupon.objCouponUser = data;
      if (this.account != null) {
        this.usercouponService
          .findCouponUser(id, this.account.id)
          .subscribe((data) => {
            if (data != null) {
              this.toastr.error(this.translate.instant(`errCoupon`));
            } else {
              this.usercouponService.insertUserCoupon(this.userCoupon).subscribe(
                (response) => {
                  this.toastr.success(this.translate.instant(`successSaveCoupon`));
                  this.ngOnInit();
                },
                (err) =>  this.toastr.error(this.translate.instant(`errCoupon`))
              );
            }
          });
      } else {
        this.router.navigate(['loginUser']);
      }
    });

  }

}
