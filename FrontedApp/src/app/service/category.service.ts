import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Category } from '../models/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8081/admin/category';
  constructor(private http: HttpClient) {}
  getAllCategories(pageNumber: number,pageSize:number, searchValue: string,sortColumn:string, sortOrder:string): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/listCategory?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`
      );
  }
  insertCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/insertCategory`, category);
  }
  updateCategory(id: any, category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.baseUrl}/updateCategory/${id}`,
      category
    );
  }
  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/deleteCategory/${categoryId}`
    );
  }
  findCategoryById(categoryId: any): Observable<Category> {
    return this.http.get<Category>(
      `${this.baseUrl}/findCategory/${categoryId}`
    );
  }
  searchCategoryByName(name: string): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/searchCategory/${name}`)
      .pipe(tap((s) => console.log('ok')));
  }
  getCategoryByStatus(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/getCategoryByStatus`);
  }
}
