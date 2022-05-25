import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'http://localhost:8081/admin';
  constructor(private httpClient: HttpClient) {}
  loginFormAdmin(user: Account): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}/loginAdmin`, user);
  }
  registerUser(acc: Account): Observable<any> {
    return this.httpClient.post<Account>(
      `${this.baseUrl}/registerAccount`,
      acc
    );
  }
  loginFormUser(email: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/loginUser/${email}`);
  }
  getAllAccountUser(
    pageNumber: number,
    pageSize: number,
    searchValue: string,
    sortColumn: string,
    sortOrder: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}/getAllAccountUser?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`
    );
  }
  updateAccount(id: any, account: Account): Observable<Account> {
    return this.httpClient.put<Account>(
      `${this.baseUrl}/updateAccount/${id}`,
      account
    );
  }
}
