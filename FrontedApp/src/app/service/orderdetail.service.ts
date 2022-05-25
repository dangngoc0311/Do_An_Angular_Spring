import { Orderdetail } from './../models/orderdetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {
  private baseUrl = 'http://localhost:8081/orderDetail';
  constructor(private http:HttpClient) { }
  insertOrderdetail(orderdetail: Orderdetail): Observable<Orderdetail>{
    return this.http.post<Orderdetail>(`${this.baseUrl}/insertOrderDetail`,orderdetail);
  }
  findOrderdetailByOrder(id:any): Observable<Orderdetail[]>{
    return this.http.get<Orderdetail[]>(`${this.baseUrl}/listOrderDetail/${id}`);
  }
  checkExistOrderProduct(cusId:any,proId:any): Observable<Orderdetail[]>{
    return this.http.get<Orderdetail[]>(`${this.baseUrl}/checkExistOrderProduct/${cusId}/${proId}`);
  }
  getHotProduct(){
    return this.http.get<any>(`${this.baseUrl}/getHotProduct`).toPromise();
  }
}
