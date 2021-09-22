import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  header : any;

  constructor(
    private httpService: HttpServiceService
  ) { }

  getToken(){
    this.header = {
      headers: { Authorization: "Bearer " + this.user.Token }
    }
  }

  CreateNote(token: any, data: any){
   
    const params = {
      Title : data.title,
      Description : data.description,
      UserId : JSON.parse(localStorage.getItem('FundooUser')!).UserId//this.user.UserId
    };
    this.getToken();
    return this.httpService.post(`${environment.baseUrl}/api/Note/AddNote`, data, true, this.header);
  }
}
