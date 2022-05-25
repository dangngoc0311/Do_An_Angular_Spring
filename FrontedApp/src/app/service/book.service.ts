import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8081/admin/book';
  constructor(private http: HttpClient) {}
  getAllBooks(
    pageNumber: number,
    pageSize: number,
    searchValue: any,
    categoryId: any,
    min: any,
    max: any,
    sortColumn: string,
    sortOrder: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/listBook?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&cateId=${categoryId}&min=${min}&max=${max}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`
    );
  }
  insertBook(formData: FormData): Observable<any> {
    return this.http.post<Book>(`${this.baseUrl}/insertBook`, formData);
  }
  updateBook(id: any, book: any): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/updateBook/${id}`, book);
  }
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteBook/${bookId}`);
  }
  findBookById(bookId: any): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/findBook/${bookId}`);
  }
  getNewProducts(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/getNewBook`);
  }
  relatedBook(cateId: any, id: any): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.baseUrl}/getRelatedBook/${cateId}/${id}`
    );
  }
  getBookByPrice(min: any, max: any): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.baseUrl}/getBookByPrice/${min}/${max}`
    );
  }
  getBookByPriceCate(cateId: any, min: any, max: any): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.baseUrl}/getBookByPriceCate/${cateId}/${min}/${max}`
    );
  }
  updateBookNoImage(id: any, book: any): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/updateBookNoImage/${id}`, book);
  }
}
