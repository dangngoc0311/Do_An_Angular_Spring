import { AccountService } from './../../../service/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit { submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    role: ['true'],
    status: ['true'],
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {

  }
  registerUser() {
    this.submitted = true;
    if (this.infoForm.valid) {
    const salt = bcrypt.genSaltSync(8);
    this.infoForm.controls['password'].setValue(
      bcrypt.hashSync(this.infoForm.controls['password'].value, salt)
    );

    this.accountService.registerUser(this.infoForm.value).subscribe(
      (data) => {
        this.toastr.success(this.translate.instant(`successRegister`));
        this.router.navigate(['loginUser']);
      },
      (err) => this.toastr.error(this.translate.instant(`errRegister`))
    );}
  }
}
