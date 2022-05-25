import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usercoupon } from '../models/usercoupon';

@Injectable({
  providedIn: 'root'
})
export class UsercouponService {
  private baseUrl = 'http://localhost:8081/user/coupon';
  constructor(private http:HttpClient) { }
  insertUserCoupon(userCoupon: Usercoupon): Observable<Usercoupon>{
    return this.http.post<Usercoupon>(`${this.baseUrl}/insertUserCoupon`,userCoupon);
  }
  findCouponUser(couponId:any,userId:any):Observable<Usercoupon>{
    return this.http.get<Usercoupon>(`${this.baseUrl}/checkUserCoupon/${couponId}/${userId}`);
  }
  findListCouponUser(userId: any): Observable<Usercoupon[]>{
    return this.http.get<Usercoupon[]>(`${this.baseUrl}/findListCouponUser/${userId}`);
  }
  updateUserCoupon(id: any,userCoupon:Usercoupon):Observable<Usercoupon>{
    return this.http.put<Usercoupon>(`${this.baseUrl}/updateUserCoupon/${id}`,userCoupon);
  }
}
