import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/service/coupon.service';
import Swal from 'sweetalert2';import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-insert-coupon',
  templateUrl: './insert-coupon.component.html',
  styleUrls: ['./insert-coupon.component.css'],
})
export class InsertCouponComponent implements OnInit { submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private router: Router, private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    name: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    discountvalue: ['', [Validators.required]],
    startdate: ['', [Validators.required]],
    enddate: ['', [Validators.required]],
    type: ['true', [Validators.required]],
    condition:['', [Validators.required]],
    status: ['true'],
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {}
  insertCoupon() {  this.submitted = true;
    if (this.infoForm.valid) {
    this.couponService.insertCoupon(this.infoForm.value).subscribe(
      (data) => {
        this.toastr.success(this.translate.instant(`successInsert`));;
        this.router.navigate(['admin/listCoupon']);
      },
       (err) =>   this.toastr.error(this.translate.instant(`errInsert`)));
  }}
}
