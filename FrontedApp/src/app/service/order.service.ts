import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8081/order';
  constructor(private http: HttpClient) {}
  insertOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/insertOrder`, order);
  }
  getAllOrders(pageNumber: number,pageSize:number, searchValue: string,sortColumn:string, sortOrder:string): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/admin/listOrder?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
  }
  findOrderById(id: any): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/findOrderById/${id}`);
  }
  findOrderByCustomer(customerId: any): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.baseUrl}/findOrdersByCustomer/${customerId}`
    );
  }
  updateOrder(id: any, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/updateOrder/${id}`, order);
  }
  getOrderMonth(){
    return this.http.get<any>(`${this.baseUrl}/getOrderMonth`).toPromise();
  }
}
