import { AccountService } from './../../../service/account.service';
// import { Label } from 'ng2-charts';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { BookService } from 'src/app/service/book.service';
import { OrderService } from 'src/app/service/order.service';
import { ReviewbookService } from 'src/app/service/reviewbook.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  host: string = 'http://localhost:8081/admin/book';
  chartLable: any;
  chartData: any;
  charts: any = [];
  listNewBook: any = [];
  listOrder!: any;
  listOrders!: Array<any>;
  listBook!: any;
  listReview!: any;
  listAccount!: any;
  pageNumber: number = 0;
  pageSize: number = 1000;
  searchValue = '';
  categoryId = '';
  min: any = '';
  max: any = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  status = 'true';

  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private reviewbookService: ReviewbookService,
    private accountService: AccountService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.orderService.getOrderMonth().then((data: any) => {
      this.chartLable = data.map((val: any) => {
        return val.months;
      });
      this.chartData = data.map((val: any) => {
        return val.totalPrice;
      });
      this.charts = new Chart('myChart', {
        type: 'bar' as ChartType,
        data: {
          labels: this.chartLable,
          datasets: [
            {
              label: '(VND)',
              data: this.chartData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(153, 102, 255)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(201, 203, 207)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              grid: {
                offset: true,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'rgb(255, 99, 132)',
              },
            },
          },
        },
      });
    });
    this.getDataOrder();
    this.getNewBooks();
    this.getDataBook();
    this.getDataReview();
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
        this.listAccount = data['totalElements'];
      });
  }
  getDataBook(): void {
    this.bookService
      .getAllBooks(
        this.pageNumber,
        this.pageSize,
        this.searchValue,
        this.categoryId,
        this.min,
        this.max,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe(
        (response) => {
          this.listBook = response['totalElements'];
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  getDataOrder() {
    this.orderService
      .getAllOrders(
        this.pageNumber,
        5,
        this.searchValue,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe(
        (response) => {
          this.listOrder = response['totalElements'];
          this.listOrders = response['content'];
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  getDataReview() {
    this.reviewbookService
      .getAllReviews(
        this.pageNumber,
        this.pageSize,
        this.searchValue,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe((data) => {
        this.listReview = data['totalElements'];
      });
  }
  getNewBooks() {
    this.bookService.getNewProducts().subscribe((data) => {
      this.listNewBook = data;
    });
  }
}
