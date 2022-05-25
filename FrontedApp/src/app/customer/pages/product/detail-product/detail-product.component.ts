import { OrderdetailService } from 'src/app/service/orderdetail.service';
import { ReviewbookService } from './../../../../service/reviewbook.service';
import { Reviewbook } from './../../../../models/reviewbook';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/models/book';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  id = '';
  host: string = 'http://localhost:8081/admin/book';
  book: Book = new Book();
  public listBook: any = [];
  public listBooks: any = [];
  listReview: any = [];
  totalstar: number = 0;
  acc: any = localStorage.getItem('user');
  account: any = JSON.parse(this.acc);
  review: Reviewbook = new Reviewbook();
  checkOrder: any = false;
  checkReview: any = false;
  //ADD CART USING sessionStorage
  cartItems: any = sessionStorage.getItem('cart');
  cartItems2: any = JSON.parse(this.cartItems);
  shopCart: any = sessionStorage.getItem('cart') != null ? this.cartItems2 : [];
  valueQtty: number = 0;
  maxAdd: number = 0;
  sortColumn = 'id';
  sortOrder = 'DESC';
  submitted: boolean = false;
  //ADD TO CART USING sessionStorage
  constructor(
    private productService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private reviewbookService: ReviewbookService,
    private fb: FormBuilder,
    private orderdetailService: OrderdetailService,
    private translate: TranslateService
  ) {}
  infoForm = this.fb.group({
    rating: ['5'],
    description: ['', [Validators.required, Validators.maxLength(150)]],
  });
  get f() {
    return this.infoForm.controls;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.findBookById(this.id).subscribe((res) => {
      this.book = res;
      this.productService
        .relatedBook(this.book.objCategory.id, this.id)
        .subscribe((data: Book[]) => {
          this.listBook = data;
        });
    });
    this.reviewbookService.findReviewByBook(this.id).subscribe((data) => {
      this.listReview = data;
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          this.totalstar += data[index].rating;
        }
        this.totalstar = Math.round(this.totalstar / data.length);
      } else {
        this.totalstar = 0;
      }
    });
    if (this.account != null) {
      this.orderdetailService
        .checkExistOrderProduct(this.account.id, this.id)
        .subscribe((check) => {
          if (check.length != 0) {
            this.checkOrder = true; //ton tai don hang
          }
        });
      this.reviewbookService
        .checkExistReview(this.account.id, this.id)
        .subscribe((check) => {
          if (check == null) {
            // khong ton tai review
            this.checkReview = true;
          }
        });
    }
    let demo = this.checkcart(this.shopCart, this.id);
    if (demo >= 0) {
      this.maxAdd = this.shopCart[demo].qty;
    }
  }
  getDataBook(): void {
    this.productService
      .getAllBooks(0, 1000, '', '', '', '', this.sortColumn, this.sortOrder)
      .subscribe(
        (response: Book[]) => {
          this.listBooks = response;
        },
        (error: HttpErrorResponse) => console.log(error.message)
      );
  }
  err(name: string) {
    this.toastr.error(
      this.translate.instant(`book`) + name + this.translate.instant(`outstock`)
    );
  }
  addReview() {
    this.submitted = true;
    if (this.infoForm.valid) {
      this.review.objBookReview = this.book;
      this.review.objReviewBook = this.account;
      this.review.rating = this.infoForm.controls['rating'].value;
      this.review.description = this.infoForm.controls['description'].value;
      this.review.status = true;
      if (this.account != null) {
        this.reviewbookService.insertReviewBook(this.review).subscribe(
          (data) => {
            this.toastr.success(this.translate.instant(`approvalReview`));
            this.infoForm = this.fb.group({
              rating: ['5'],
              description: [''],
            });
            this.ngOnInit();
            this.checkOrder = false;
            this.checkReview = false;
          },
          (err) => this.toastr.error(this.translate.instant(`errReview`))
        );
      } else {
        this.router.navigate(['loginUser']);
      }
    }
  }

  addToCart(id: any) {
    // var check = this.checkproduct(this.listBooks, id);
    var valueQtty = parseInt(
      (<HTMLInputElement>document.getElementById('quantity')).value
    );
    if (this.checkcart(this.shopCart, id) < 0) {
      if (valueQtty >= this.book.quantity) {
        this.book.qty = this.book.quantity;
      } else {
        this.book.qty = valueQtty;
      }
      this.shopCart.push(this.book);
      sessionStorage.setItem('cart', JSON.stringify(this.shopCart));
      this.toastr.success(this.translate.instant(`successCart`));
    } else {
      for (let i = 0; i < valueQtty; i++) {
        let demo = this.checkcart(this.shopCart, id);
        if (demo >= 0) {
          this.shopCart[demo].qty += 1;
          sessionStorage.setItem('cart', JSON.stringify(this.shopCart));
          this.toastr.success(this.translate.instant(`successCart`));
        }
      }
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
}
