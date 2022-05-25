import { AccountService } from './../../../service/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  returnUrl!: string;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    role: ['true'],
  });
  get f() {
    return this.infoForm.controls;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  loginUser() {
    this.submitted = true;
    if (this.infoForm.valid) {
    this.accountService
      .loginFormUser(this.infoForm.controls['email'].value)
      .subscribe(
        (data) => {
          if (
            bcrypt.compareSync(
              this.infoForm.controls['password'].value,
              data.password
            )
          ) {
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigateByUrl(this.returnUrl);
            this.toastr.success(this.translate.instant(`successLogin`));
          } else {
            this.toastr.error(this.translate.instant(`errLogin`));
          }
        },
        (err) => this.toastr.error(this.translate.instant(`errLogin`))
      );
  }
}}
