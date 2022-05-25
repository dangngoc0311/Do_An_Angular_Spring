import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  public listAccount!: Array<any>;
  public pages!: Array<any>;
  pageNumber: number = 0;
  pageSize: number = 4;
  searchValue = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}
  searchForm = this.fb.group({
    search: [''],
  });
  ngOnInit(): void {
    this.getDataAccount();
  }
  getDataAccount() {
    this.accountService
      .getAllAccountUser(
        this.pageNumber,
        this.pageSize,
        this.searchValue,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe((data) => {
        this.listAccount = data['content'];
        this.pages = new Array(data['totalPages']);
      });
  }
  setPageNumber(i: any, event: any) {
    event.preventDefault();
    this.pageNumber = i;
    this.getDataAccount();
  }
  setPageSize(value: any) {
    this.pageSize = value;
    this.getDataAccount();
  }
  sortBy(column: any, order: any) {
    this.sortColumn = column;
    this.sortOrder = order;
    this.getDataAccount();
  }
  searchAccount() {
    this.searchValue = this.searchForm.controls['search'].value;
    this.getDataAccount();
  }
}
