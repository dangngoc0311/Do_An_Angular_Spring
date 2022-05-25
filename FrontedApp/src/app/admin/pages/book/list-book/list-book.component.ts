import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
})
export class ListBookComponent implements OnInit {
  public listBook!: Array<any>;
  host: string = 'http://localhost:8081/admin/book';
  pages!: Array<any>;
  pageNumber: number = 0;
  pageSize: number = 3;
  searchValue = '';
  categoryId = '';
  min: any = '';
  max: any = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  status = 'true';
  listCate: any = [];
  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private translate: TranslateService
  ) {}
  searchForm = this.fb.group({
    search: [''],
  });
  ngOnInit(): void {
    this.getDataBook();
    this.getDataCategory();
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
          this.listBook = response['content'];
          this.pages = new Array(response['totalPages']);
        },
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  getDataCategory(): void {
    this.categoryService.getCategoryByStatus().subscribe(
      (response: Category[]) => {
        this.listCate = response;
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
  setPageNumber(i: any, event: any) {
    event.preventDefault();
    this.pageNumber = i;
    this.getDataBook();
  }
  setPageSize(value: any) {
    this.pageSize = value;
    this.getDataBook();
  }
  search() {this.pageNumber=0;
    this.searchValue = this.searchForm.controls['search'].value;
    this.getDataBook();
  }
  findBookByCateId(id: any) {
    this.pageNumber=0;
    this.categoryId = id;
    this.getDataBook();
  }
  findBookByPrice(min: any, max: any) {this.pageNumber=0;
    this.min = min;
    this.max = max;
    this.getDataBook();
  }
  sortBy(column: any, order: any) {this.pageNumber=0;
    this.sortColumn = column;
    this.sortOrder = order;
    this.getDataBook();
  }
  deleteBook(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(id).subscribe(
          (res) => {
            this.getDataBook();
            this.toastr.success(this.translate.instant(`successDelete`));
          },
          (err) => this.toastr.error(this.translate.instant(`errDelete`))
        );
      }
    });
  }
}
