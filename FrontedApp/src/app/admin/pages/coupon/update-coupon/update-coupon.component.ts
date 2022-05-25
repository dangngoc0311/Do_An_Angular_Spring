import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/service/coupon.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css'],
})
export class UpdateCouponComponent implements OnInit {
  id = ''; submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    name: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    discountvalue: ['', [Validators.required]],
    startdate: ['', [Validators.required]],
    enddate: ['', [Validators.required]],
    type: ['true', [Validators.required]],
    condition :['', [Validators.required]],
    status: ['true'],
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.couponService.findCouponById(this.id).subscribe((res) => {
      this.infoForm = this.fb.group({
        name: [`${res.name}`],
        quantity: [`${res.quantity}`],
        discountvalue: [`${res.discountvalue}`],
        startdate: [formatDate(`${res.startdate}`, 'yyyy-MM-dd', 'en')],
        enddate: [formatDate(`${res.enddate}`, 'yyyy-MM-dd', 'en')],
        type: [`${res.type}`],
        condition: [`${res.condition}`],
        status: [`${res.status}`]
      });
    });
  }
  updateCoupon() {  this.submitted = true;
    if (this.infoForm.valid) {
    this.couponService.updateCoupon(this.id,this.infoForm.value).subscribe(data => {
      this.toastr.success(this.translate.instant(`successUpdate`));
      this.router.navigate(['admin/listCoupon']);
    },
    (err) =>  this.toastr.error(this.translate.instant(`errUpdate`)))

  }}
}
