import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelServiceService {
  user = JSON.parse(localStorage.getItem('FundooUser')!);

  constructor(
    private httpService: HttpServiceService
  ) { }

  header = {
    headers: { Authorization: "Bearer " + this.user.Token},
  }

  GetLabels(){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/api/Label/GetLabelByUserId?userId=${userId}`, true, this.header);
  }
}