import { ReviewbookService } from 'src/app/service/reviewbook.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/book.service';
import { TranslateService } from '@ngx-translate/core';
import { Reviewbook } from 'src/app/models/reviewbook';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css'],
})
export class DetailBookComponent implements OnInit {
  id = '';
  host: string = 'http://localhost:8081/admin/book';
  book: Book = new Book();
  listReview: any = [];
  totalstar: number = 0;
  totalRe : number = 0;
  review = new Reviewbook();
  constructor(
    private productService: BookService,
    private route: ActivatedRoute,
    private reviewbookService: ReviewbookService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.findBookById(this.id).subscribe((res) => {
      this.book = res;
    });
    this.reviewbookService
      .findReviewByBookNoStatus(this.id)
      .subscribe((data) => {
        this.listReview = data;
      });
    this.reviewbookService.findReviewByBook(this.id).subscribe((data) => {
      this.totalRe = data.length;
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          this.totalstar += data[index].rating;
        }
        this.totalstar = Math.round(this.totalstar / data.length);
      } else {
        this.totalstar = 0;
      }
    });
  }
  changeStatus(id: any) {
    this.reviewbookService.findReviewById(id).subscribe((data) => {
      this.review = data;
      if (data.status == 0) {
        this.review.status = 1;
      } else {
        this.review.status = 0;
      }
      this.reviewbookService.updateReviewBook(id, this.review).subscribe(
        (res) => {
          this.toastr.success(this.translate.instant(`successUpdate`));
          this.ngOnInit();
        },
        (err) => this.toastr.error(this.translate.instant(`errUpdate`))
      );
    });
  }
}
