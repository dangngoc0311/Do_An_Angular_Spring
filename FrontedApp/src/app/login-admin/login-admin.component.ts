import { AccountService } from './../service/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  returnUrl!: string;
  submitted: boolean = false;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    role: 'false',
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
    this.translate.setDefaultLang('vi');
    this.translate.use(localStorage.getItem('language') || 'vi');
  }
  loginUser() {
    this.submitted = true;
    if (this.infoForm.valid) {
      this.accountService
        .loginFormUser(this.infoForm.controls['email'].value)
        .subscribe(
          (data) => {
            if (!data.role) {
              if (
                bcrypt.compareSync(
                  this.infoForm.controls['password'].value,
                  data.password
                )
              ) {
                sessionStorage.setItem('adminUser', JSON.stringify(data));
                this.router.navigateByUrl(this.returnUrl);
                this.toastr.success(this.translate.instant(`successLogin`));
              } else {
                this.toastr.error(this.translate.instant(`errLogin`));
              }
            } else {
              this.toastr.error(this.translate.instant(`errLogin`));
            }
          },
          (err) => {
            this.toastr.error(this.translate.instant(`errLogin`));
          }
        );
    }
  }
}
