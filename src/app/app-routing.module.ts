import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const data = localStorage.getItem('FundooForget'); 
const token = data != null ? JSON.parse(data).Token : '';

const routes: Routes = [
  { path : 'register', component:RegisterComponent},
  { path : 'login', component:LoginComponent},
  { path : 'forgotPassword', component:ForgotPasswordComponent},
  { path : `resetPassword/${token}`, component:ResetPasswordComponent},
  { path : `dashboard`, component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
