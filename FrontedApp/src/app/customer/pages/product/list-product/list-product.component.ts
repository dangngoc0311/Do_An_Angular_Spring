import { ReviewbookService } from './../../../../service/reviewbook.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  pages!: Array<any>;
  pageNumber: number = 0;
  pageSize: number = 6;
  public listCate?: Category[];
  listBook!: Array<any>;
  listNewBook: any = [];
  //ADD CART USING sessionStorage
  cartItems: any = sessionStorage.getItem('cart');
  cartItems2: any = JSON.parse(this.cartItems);
  shopCart: any = sessionStorage.getItem('cart') != null ? this.cartItems2 : [];
  listReview: any = [];
  searchValue = '';
  categoryId: any = '';
  min: any = '';
  max: any = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  //ADD TO CART USING sessionStorage
  //ADD CART USING DATABASE
  //ADD CART USING DATABASE
  // account: any = sessionStorage.getItem('user');
  // accountId: any = JSON.parse(this.account).id;
  // listCartByAcc?: Cart[];
  // cartItems: Cart = new Cart();
  // bookCart: Book = new Book();
  //ADD CART USING DATABASE

  host: string = 'http://localhost:8081/admin/book';

  constructor(
    private translate: TranslateService,
    private bookService: BookService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private reviewbookService: ReviewbookService
  ) {

  }
  formSearch = this.fb.group({
    searchName: [''],
  });
  ngOnInit(): void {
    this.getDataCategory();
    this.getDataBook();
    this.getNewBooks();
  }
  getDataCategory(): void {
    this.categoryService.getCategoryByStatus().subscribe(
      (response: Category[]) => {
        this.listCate = response;
      },
      (error: HttpErrorResponse) => console.log(error.message)
    );
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
        (error: HttpErrorResponse) => console.log(error.message)
      );
  }
  setPageNumber(i: any) {
    this.pageNumber = i;
    this.getDataBook();
  }
  setPageSize(value: any) {
    this.pageSize = value;
    this.getDataBook();
  }
  searchForm() {
    this.pageNumber=0;
    this.searchValue = this.formSearch.controls['searchName'].value;
    this.getDataBook();
  }
  findBookByCateId(id: any) {
    this.pageNumber=0;
    this.categoryId = id;
    this.getDataBook();
  }
  findBookByPrice(min: any, max: any) {
    this.pageNumber=0;
    this.min = min;
    this.max = max;
    this.getDataBook();
  }
  getNewBooks() {
    this.bookService.getNewProducts().subscribe((data) => {
      this.listNewBook = data;
    });
  }
  reset() {
    this.categoryId = '';
    this.searchValue = '';
    this.min = '';
    this.max = '';
    this.getDataBook();
  }
  err(name: string) {
    this.toastr.error(this.translate.instant(`book`) +  name + this.translate.instant(`outstock`));
  }
  sortBy(column: any, order: any) {
    this.sortColumn = column;
    this.sortOrder = order;
    this.getDataBook();
  }

  // ADD TO CART USING sessionStorage
  addToCart(id: any) {
    var check = this.checkproduct(this.listBook, id);
    let demo = this.checkcart(this.shopCart, id);
    if (demo >= 0) {
      console.log(this.shopCart[demo]);
      if (this.shopCart[demo].qty >= this.shopCart[demo].quantity) {
        this.shopCart[demo].qty == this.shopCart[demo].quantity;
      } else {
        this.shopCart[demo].qty += 1;
      }
      sessionStorage.setItem('cart', JSON.stringify(this.shopCart));
      this.toastr.success(this.translate.instant(`successCart`))
    } else {
      check.qty = 1;
      this.shopCart.push(check);
      sessionStorage.setItem('cart', JSON.stringify(this.shopCart));
      this.toastr.success(this.translate.instant(`successCart`))
    }
  }
  checkproduct(pro: any, id: any) {
    for (let index = 0; index < pro.length; index++) {
      if (pro[index].id == id) {
        return pro[index];
      }
    }
    return false;
  }

  checkcart(cart: any, id: any) {
    for (let index = 0; index < cart.length; index++) {
      if (cart[index].id == id) {
        return index;
      }
    }
    return -1;
  }
  //END ADD TO CART USING sessionStorage
}
