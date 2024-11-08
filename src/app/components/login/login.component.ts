import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router
  )
  { }
  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authenticationService.login(loginData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.authenticationService.saveAccessToken(response.data.accessToken)
            this.authenticationService.saveRefreshToken(response.data.refreshToken)
            this.authenticationService.saveUsername(response.data.username)
            if (response.data.roles.includes('ROLE_ADMIN')) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          }
        },
        error: (err) => {
          if(err.error.status !== 200)
          alert('Login failed');
        }
      });
    } else {
      alert('Form is invalid');
    }
  }
  autoClick() {
    this.loginForm.setValue({
      username: "leoviet",
      password: "1111"
    })
  }
  navigateSignup() {
    this.router.navigate(["/signup"])
    }
}
