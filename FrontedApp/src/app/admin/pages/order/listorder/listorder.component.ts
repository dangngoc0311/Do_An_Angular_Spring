import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css'],
})
export class ListorderComponent implements OnInit {
  public listOrder!: Array<any>;
  public pages!: Array<any>;
  pageNumber: number = 0;
  pageSize: number = 5;
  searchValue = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  constructor(private orderService: OrderService, private fb: FormBuilder) {}
  searchForm = this.fb.group({
    search: [''],
  });
  ngOnInit(): void {
    this.getDataOrder();
  }
  getDataOrder() {
    this.orderService
      .getAllOrders(
        this.pageNumber,
        this.pageSize,
        this.searchValue,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe(
        (response) => {
          this.listOrder = response['content'];
          this.pages = new Array(response['totalPages']);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  setPageNumber(i: any, event: any) {
    event.preventDefault();
    this.pageNumber = i;
    this.getDataOrder();
  }
  setPageSize(value: any) {
    this.pageSize = value;
    this.getDataOrder();
  }
  searchOrder() {
    this.searchValue = this.searchForm.controls['search'].value;
    this.getDataOrder();
  }

  sortBy(column: any, order: any) {
    this.sortColumn = column;
    this.sortOrder = order;
    this.getDataOrder();
  }
}
