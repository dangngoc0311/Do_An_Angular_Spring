import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  acc: any = localStorage.getItem('adminUser');
  account: any = JSON.parse(this.acc);
  a: Account = new Account();
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService, private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    name: [this.account.name],
    address: [this.account.address],
  });
  ngOnInit(): void {}
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
