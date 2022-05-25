import { ReviewbookService } from './../../../../service/reviewbook.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Reviewbook } from 'src/app/models/reviewbook';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css'],
})
export class ListReviewComponent implements OnInit {
  review = new Reviewbook();
  public listReview!: Array<any>;
  public pages!: Array<any>;
  pageNumber: number = 0;
  pageSize: number = 4;
  searchValue = '';
  sortColumn = 'id';
  sortOrder = 'DESC';
  constructor(
    private fb: FormBuilder,
    private reviewbookService: ReviewbookService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  searchForm = this.fb.group({
    search: [''],
  });
  infoForm = this.fb.group({
    status: ['true'],
  });
  ngOnInit(): void {
    this.getDataReview();
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
        this.listReview = data['content'];
        this.pages = new Array(data['totalPages']);
      });
  }
  setPageNumber(i: any, event: any) {
    event.preventDefault();
    this.pageNumber = i;
    this.getDataReview();
  }
  setPageSize(value: any) {
    this.pageSize = value;
    this.getDataReview();
  }
  sortBy(column: any, order: any) {
    this.sortColumn = column;
    this.sortOrder = order;
    this.getDataReview();
  }
  searchReview() {
    this.searchValue = this.searchForm.controls['search'].value;
    this.getDataReview();
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
          this.getDataReview();
        },
        (err) => this.toastr.error(this.translate.instant(`errUpdate`))
      );
    });
  }
}
