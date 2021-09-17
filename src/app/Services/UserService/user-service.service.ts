import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService: HttpServiceService) { }

  Register(data: any){
    const params =  {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Password: data.password
    }
    return this.httpService.post(`${environment.baseUrl}/api/User/register`, params);
  }

  Login(data: any){
    const params = {
      Email: data.email,
      Password: data.password
    }
    return this.httpService.post(`${environment.baseUrl}/api/User/login`,params);
  }

  ForgotPassword(data: any){
    const email = data.email
    return this.httpService.post(`${environment.baseUrl}/api/User/ForgotPassword?email=${email}`);
  }

  ResetPassword(data: any){
    const params = {
      Email: data.email,
      NewPassword:data.password,
      ConfirmNewPassword:data.cpassword
    }
    return this.httpService.put(`${environment.baseUrl}/api/User/ResetPassword`,params);
  }
}
