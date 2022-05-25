import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  acc: any = sessionStorage.getItem('adminUser');
  account: any = JSON.parse(this.acc);
  language: any;
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('vi');
    this.translateService.use(localStorage.getItem('language') || 'vi');
  }

  ngOnInit(): void {
    this.language = localStorage.getItem('language') || 'vi';
  }
  logout() {
    sessionStorage.removeItem('adminUser');
    this.router.navigate(['/loginAdmin']);
  }
  changeLanguage(lang: any) {
    localStorage.setItem('language', lang);
    this.translateService.use(lang);
    // window.location.reload();
  }
}
