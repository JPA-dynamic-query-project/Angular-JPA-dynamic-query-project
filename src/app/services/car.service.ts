import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarRequest } from '../request/car-request';
import { SearchCarRequest } from '../request/search-car-request';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = "http://localhost:8080/cars";

  constructor(private http: HttpClient) { }
  
  private createHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');  
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`  
    });
  }

  getCars(pageNo: number, pageSize: number, sortBy: string): Observable<any> {
    const getListCar = `${this.baseUrl}/list`;
    let params = new HttpParams()
                .set('pageNo', pageNo.toString())
                .set('pageSize', pageSize.toString())
                .set('sortBy', sortBy);
    return this.http.get<any>(getListCar, { headers: this.createHeaders(), params });
  }

  getCarById(carRequest: CarRequest): Observable<any> {
    const getCarByIdUrl = `${this.baseUrl}/get-car`;
    return this.http.post<any>(getCarByIdUrl, carRequest, { headers: this.createHeaders() });
  }

  updateCar(carRequest: CarRequest): Observable<any> {
    const updateUrl = `${this.baseUrl}/update-car`;
    return this.http.post<any>(updateUrl, carRequest, { headers: this.createHeaders() });
  }

  deleteCar(carRequest: CarRequest): Observable<any> {
    const deleteUrl = `${this.baseUrl}/delete-car`;
    return this.http.post<any>(deleteUrl, carRequest, { headers: this.createHeaders() });
  }

  addCar(carRequest: CarRequest): Observable<any> {
    const addUrl = `${this.baseUrl}/add-car-procedure`;
    return this.http.post<any>(addUrl, carRequest, { headers: this.createHeaders() });
  }

  searchCar(searchCarRequest: SearchCarRequest): Observable<any> {
    const searchUrl = `${this.baseUrl}/search-by-entity-manager`;
    return this.http.post<any>(searchUrl, searchCarRequest, { headers: this.createHeaders() });
  }
}
