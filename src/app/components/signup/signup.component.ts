import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  signup() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      this.authenticationService.signup(signupData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            alert(response.message); 
            this.router.navigate(['/login']);  
          }
        },
        error: (err) => {
          if (err.error.status === 400){
            alert(err.error.message);  
          }
        }
      });
    } else {
      console.warn('Form is invalid'); 
    }
  }
  
}
