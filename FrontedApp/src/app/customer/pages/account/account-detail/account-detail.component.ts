import { ReviewbookService } from './../../../../service/reviewbook.service';
import { UsercouponService } from 'src/app/service/usercoupon.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';
import { Account } from 'src/app/models/account';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  acc: any = localStorage.getItem('user');
  account: any = JSON.parse(this.acc);
  a: Account = new Account();
  listUserCoupon: any;
  listOrderTracking: any;
  listReviews: any;
  constructor(
    private usercouponService: UsercouponService,
    private orderService: OrderService,
    private reviewbookService: ReviewbookService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    name: [this.account.name],
    address: [this.account.address],
  });
  ngOnInit(): void {
    this.usercouponService
      .findListCouponUser(this.account.id)
      .subscribe((data) => {
        this.listUserCoupon = data;
      });
    this.orderService.findOrderByCustomer(this.account.id).subscribe((data) => {
      this.listOrderTracking = data.length;
    });
    this.reviewbookService
      .getAllReviewByUser(this.account.id)
      .subscribe((data) => {
        this.listReviews = data['content'];
      });
  }
  updateAccount() {
    this.accountService.loginFormUser(this.account.email).subscribe((data) => {
      this.a = data;
      this.a.name = this.infoForm.controls['name'].value;
      this.a.address = this.infoForm.controls['address'].value;
      this.accountService.updateAccount(data.id, this.a).subscribe(
        (res) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.toastr.success(this.translate.instant(`successUpdate`));
          this.ngOnInit();
        },
        (err) => this.toastr.error(this.translate.instant(`errUpdate`))
      );
    });
  }
}
