import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { CarRequest } from '../../request/car-request';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {


  addForm!: FormGroup;
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      dateBooking: ['', Validators.required]
    })
  }

  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router,
  ) { }

  addNewCar() {
    if(this.addForm.valid){
      const carRequest: CarRequest = this.addForm.value;
      this.carService.addCar(carRequest).subscribe(
        response => {
          alert(response.message)
          this.router.navigate(["/admin"]);
        },
        error =>{
          alert(error.message)
        }
      )
    }else {
      alert('Form is invalid');
    }
  }
}
