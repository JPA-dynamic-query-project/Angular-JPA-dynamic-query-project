import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { CarRequest } from '../../request/car-request';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent implements OnInit {

  updateForm!: FormGroup;
  carRequest!: CarRequest;  
  carId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const carData = localStorage.getItem('selectedCar');
    if (carData) {
        const car = JSON.parse(carData);
        this.carId = car.id; 

        
        this.updateForm = this.formBuilder.group({
            name: [car.name, Validators.required],
            brand: [car.brand, Validators.required],
            color: [car.color, Validators.required],
            dateBooking: [car.dateBooking, Validators.required]
        });
    } else {
        alert("Error: No car data found.");
        this.router.navigate(['/admin']);
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const carRequest: CarRequest ={
        id: this.carId,
        ...this.updateForm.value,
      } 
      
      this.carService.updateCar(carRequest).subscribe(
        response => {
          alert(response.message);
          this.router.navigate(['/admin']);
        },
        error => {
          alert(error.message);
        }
      );
    } else {
      alert('Form is invalid');
    }
  }
}
