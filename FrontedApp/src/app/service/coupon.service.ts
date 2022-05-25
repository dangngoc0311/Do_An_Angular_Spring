import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Coupon } from '../models/coupon';


@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private baseUrl = 'http://localhost:8081/admin/coupon';
  constructor(private http:HttpClient) {
  }
  getAllCoupons(pageNumber: number,pageSize:number, searchValue: string,sortColumn:string, sortOrder:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listCoupon?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
  }
  insertCoupon(coupon: Coupon): Observable<Coupon>{
    return this.http.post<Coupon>(`${this.baseUrl}/insertCoupon`,coupon);
  }
  updateCoupon(id:any,coupon: Coupon): Observable<Coupon>{
    return this.http.put<Coupon>(`${this.baseUrl}/updateCoupon/${id}`,coupon);
  }
  deleteCoupon(couponId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteCoupon/${couponId}`);
  }
  findCouponById(couponId:any):Observable<Coupon>{
    return this.http.get<Coupon>(`${this.baseUrl}/findCoupon/${couponId}`);
  }
  getAllExpiredCoupons(accId:any): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/listExpiredCoupon/${accId}`);
  }

}
