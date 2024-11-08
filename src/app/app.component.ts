import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jpa-query-dynamic';
  constructor(private authService: AuthenticationService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout() {

    this.authService.logout().subscribe(
      response => {
        alert(response.message)
      },
      error => {
        alert(error.message)
      }
    )
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
