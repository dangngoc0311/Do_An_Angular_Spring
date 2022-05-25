import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  acc: any = localStorage.getItem('user');
  account: any = JSON.parse(this.acc);
  language:any;

  constructor(private translateService :TranslateService,private router: Router){
    this.translateService.setDefaultLang('vi');
    this.translateService.use(localStorage.getItem('language') || 'z');
  }
  ngOnInit(): void {
    this.language = localStorage.getItem('language') || 'vi';

  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/loginUser']);
  }
  changeLanguage(lang:any) {
    localStorage.setItem('language',lang);
    this.translateService.use(lang);
  // window.location.reload();
  }
}
