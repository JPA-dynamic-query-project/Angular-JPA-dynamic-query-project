import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { error } from 'console';
import { response } from 'express';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { start } from 'repl';
import { SearchCarRequest } from '../../request/search-car-request';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchForm!: FormGroup;
  username: string | null = '';
  cars: any[] = [];
  pageNo: number = 1;
  pageSize: number = 2;
  totalPages: number = 0;
  totalElements: number = 0;
  sortBy: string = "name:desc";
  searchMode: boolean = false;
  searchCarRequest!: SearchCarRequest;;
  constructor(private carService: CarService,
    private router: Router,
    private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.username = localStorage.getItem('username');
    this.getListCarWithPageable();
    this.searchForm = this.formBuilder.group({
      name: [''],
      brand: [''],
      color: [''],
      startDate: [''],
      endDate: ['']
    })
  }
  getListCarWithPageable() {
    console.log(this.pageNo, this.pageSize, this.sortBy);
    this.carService.getCars(this.pageNo, this.pageSize, this.sortBy).subscribe({
      next: (response) => {
        this.cars = response.data.items;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
      },
      error: (err) => {
        alert(err.message)
      } 
    }
    )
  }
  deleteCar(car: any) {
    if (confirm('Are you sure delete car?')) {
      this.carService.deleteCar(car).subscribe({
        next: (response) => {
          alert(response.message);
          this.getListCarWithPageable();
        },
        error: () => {
          alert('Failed to delete the car');
        }
      })
    }
  }
  navigateUpdateCar(id: number) {
    this.router.navigate(['/update-car', id])
  }

  previousPage(): void {
    if (this.pageNo > 1) {
      this.pageNo--;
      if (this.searchMode) {
        this.searchCarRequest.pageNo = this.pageNo;
        this.getSearchResult();
      } else {
        this.getListCarWithPageable();
      }
    }
  }

  nextPage(): void {
    if (this.pageNo < this.totalPages) {
      this.pageNo++;
      if (this.searchMode) {
        this.searchCarRequest.pageNo = this.pageNo;
        this.getSearchResult();
      } else {
        this.getListCarWithPageable();
      }
    }
  }

  changeSort(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value + ":desc";
    if (this.searchMode) {
      this.searchCarRequest.field = target.value;
      this.getSearchResult();
    } else {
      this.getListCarWithPageable();
    }
  }
  searchCars() {
    this.pageNo = 1;
    this.searchMode = true;
    this.searchCarRequest = {
      ...this.searchForm.value,
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      field: this.sortBy.split(':')[0],
      direction: this.sortBy.split(':')[1]
    };
    this.getSearchResult();
  }
  getSearchResult() {
    if (this.searchCarRequest) {

      this.carService.searchCar(this.searchCarRequest).subscribe(
        response => {
          this.cars = response.data.items;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
        },
        error => {
          alert(error.message);
        }
      );
    }
  }
}
