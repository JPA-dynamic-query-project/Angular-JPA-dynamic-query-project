import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { AddCarComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "update-car", component: UpdateCarComponent},
  {path: "add-car-procedure", component: AddCarComponent},
  {path: "admin", component: AdminComponent},
  {path: "home", component: HomeComponent},
  {path: "", redirectTo: "login", pathMatch: "full"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}
