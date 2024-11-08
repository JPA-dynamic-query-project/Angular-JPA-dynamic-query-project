import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  username: string | null = '';
  cars: any[] = [];
  pageNo: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  sortBy: string = "name:desc";
  constructor(private carService: CarService, private router: Router) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.getListCarWithPageable();
  }
  getListCarWithPageable() {
    this.carService.getCars(this.pageNo, this.pageSize, this.sortBy).subscribe({
      next: (response) => {
        this.cars = response.data.items;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
      },
      error: (err) => {
        if (err.error.status !== 200) {
          alert("Get list car failed")
        }
      }
    }
    )
  }
  deleteCar(car: any) {
    if (confirm('Are you sure delete car?')) {
      this.carService.deleteCar(car).subscribe({
        next: (response)=>{
          alert(response.message);
          console.log(response)
          this.getListCarWithPageable();
        },
        error: () => {
          alert('Failed to delete the car');
        }
      })
    }
  }

  navigateUpdateCar(car: any) {
    localStorage.setItem('selectedCar', JSON.stringify(car));
    this.router.navigate(['/update-car'])
  }

  addNewCar() {
    this.router.navigate(['/add-car-procedure'])
  }
  previousPage(): void {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.getListCarWithPageable();
    }
  }

  nextPage(): void {
    if (this.pageNo < this.totalPages) {
      this.pageNo++;
      this.getListCarWithPageable();
    }
  }

  changeSort(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value + ":desc";
    this.getListCarWithPageable();
  }
}

