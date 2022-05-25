import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  acc: any = sessionStorage.getItem('adminUser');
  account: any = JSON.parse(this.acc);
  constructor() { }

  ngOnInit(): void {
  }

}
