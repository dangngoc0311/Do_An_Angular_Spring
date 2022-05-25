import { Category } from './../../../../models/category';
import { CategoryService } from './../../../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  public listCate!: Array<any>;
  public pages!: Array<any>;
  pageNumber: number = 0;
  pageSize: number = 4;
  searchValue = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  searchForm = this.fb.group({
    search: [''],
  });
  ngOnInit(): void {
    this.getDataCategory();
  }
  getDataCategory(): void {
    this.categoryService
      .getAllCategories(
        this.pageNumber,
        this.pageSize,
        this.searchValue,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe(
        (response) => {
          this.listCate = response['content'];
          this.pages = new Array(response['totalPages']);
        },
        (error: HttpErrorResponse) => console.log(error.message)
      );
  }
  setPageNumber(i: any, event: any) {
    event.preventDefault();
    this.pageNumber = i;
    this.getDataCategory();
  }
  setPageSize(value: any) {
    this.pageSize = value;
    this.getDataCategory();
  }
  sortBy(column: any, order: any) {
    this.sortColumn = column;
    this.sortOrder = order;
    this.getDataCategory();
  }
  deleteCategory(id: any) {
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
        this.categoryService.deleteCategory(id).subscribe((res) => {
          this.getDataCategory();
          this.toastr.success(this.translate.instant(`successDelete`));
        },
        (error)=> this.toastr.error(this.translate.instant(`errDelete`)));
      }
    });
  }
  searchCategory() {
    this.searchValue = this.searchForm.controls['search'].value;
    this.getDataCategory();
  }
}
