import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Reviewbook } from '../models/reviewbook';

@Injectable({
  providedIn: 'root',
})
export class ReviewbookService {
  private baseUrl = 'http://localhost:8081/reviewBook';
  constructor(private http: HttpClient) {}
  insertReviewBook(reviewBook: Reviewbook): Observable<Reviewbook> {
    return this.http.post<Reviewbook>(
      `${this.baseUrl}/insertReviewBook`,
      reviewBook
    );
  }
  getAllReviews(
    pageNumber: number,
    pageSize: number,
    searchValue: string,
    sortColumn: string,
    sortOrder: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/listReviewBook?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`
    );
  }
  findReviewById(id: any): Observable<Reviewbook> {
    return this.http.get<Reviewbook>(
      `${this.baseUrl}/findReviewBookById/${id}`
    );
  }
  updateReviewBook(id: any, reviewBook: Reviewbook): Observable<Reviewbook> {
    return this.http.put<Reviewbook>(
      `${this.baseUrl}/updateReviewBook/${id}`,
      reviewBook
    );
  }
  findReviewByBook(bookId: any): Observable<Reviewbook[]> {
    return this.http.get<Reviewbook[]>(
      `${this.baseUrl}/findReviewBookByProduct/${bookId}`
    );
  }
  checkExistReview(cusId: any, bookId: any): Observable<Reviewbook> {
    return this.http.get<Reviewbook>(
      `${this.baseUrl}/checkExistReview/${cusId}/${bookId}`
    );
  }
  findReviewByBookNoStatus(bookId: any): Observable<Reviewbook[]> {
    return this.http.get<Reviewbook[]>(
      `${this.baseUrl}/findReviewBookByProductNoStatus/${bookId}`
    );
  }
  getAllReviewByUser(customerId: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/listReviewBookByUser/${customerId}`
    );
  }
}
