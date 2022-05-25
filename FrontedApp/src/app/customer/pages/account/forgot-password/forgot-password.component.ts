import { Account } from './../../../../models/account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/service/account.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  chatIsToggled = false;
  submitted: boolean = false;
  acc: Account = new Account();
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {}
  updateUser() {
    this.submitted = true;

    this.accountService
      .loginFormUser(this.infoForm.controls['email'].value)
      .subscribe(
        (data) => {
          if (data == null) {
            this.toastr.error(this.translate.instant(`notExist`));
          } else {
            const salt = bcrypt.genSaltSync(8);
            this.acc = data;
            this.chatIsToggled = true;
            if (this.infoForm.valid) {
              if (this.infoForm.controls['password'].value.length > 0) {
                this.acc.password = bcrypt.hashSync(
                  this.infoForm.controls['password'].value,
                  salt
                );
                this.accountService.updateAccount(data.id, this.acc).subscribe(
                  (res) => {
                    this.toastr.success(
                      this.translate.instant(`successUpdate`)
                    );
                    this.router.navigate(['loginUser']);
                  },
                  (err) => {
                    this.toastr.error(this.translate.instant(`errUpdate`));
                  }
                );
              }
            }
          }
        },
        (err) => this.toastr.error(this.translate.instant(`notExist`))
      );
  }
}
