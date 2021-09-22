import { Injectable } from '@angular/core';
//import { env } from 'process';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  
  constructor(
    private httpService: HttpServiceService
  ) { }

  header = {
    headers: { Authorization: "Bearer " + this.user.Token},
  }

  CreateNote(data: any){
    const params = {
      Title : data.title,
      Description : data.description,
      Color : data.color,
      Archive : data.archive,
      Pin : data.pin,
      UserId : this.user.UserId
    }
    return this.httpService.post(`${environment.baseUrl}/api/Note/AddNote`, params, true, this.header);
  }

  GetNotes(){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Note/GetNotes?userId=${userId}`, true, this.header);

  }
}
