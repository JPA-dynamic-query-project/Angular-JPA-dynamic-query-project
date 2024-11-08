import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../request/login-request';
import { LoginResponse } from '../response/login-response';
import { DataRespone } from '../data-response-generic/data-respone';
import { SignupRequest } from '../request/signup-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: boolean = false;
  private baseUrl = "http://localhost:8080/auth";
  
  constructor(private http: HttpClient) { }
  
  login(loginData: LoginRequest): Observable<DataRespone<LoginResponse>> {
    return this.http.post<DataRespone<LoginResponse>>(this.baseUrl + "/login", loginData);
  }

  signup(signupData: SignupRequest): Observable<DataRespone<string>> {
    return this.http.post<DataRespone<string>>(this.baseUrl + "/signup", signupData);
  }

  logout(): Observable<DataRespone<string>> {
    const refreshToken = localStorage.getItem('refreshToken');
    const headers = new HttpHeaders({
      'Referer': `${refreshToken}`  
    });
    console.log(headers)
    return this.http.post<DataRespone<string>>(this.baseUrl + "/logout", {}, { headers });
  }

  saveAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  saveUsername(username: string) {
    localStorage.setItem('username', username);
  }
}
