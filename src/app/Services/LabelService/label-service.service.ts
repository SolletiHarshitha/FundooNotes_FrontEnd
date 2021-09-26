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
    return this.httpService.get(`${environment.baseUrl}/api/Label/GetLabelByUserId?userId=${userId}`, true, this.header);
  }

  GetNotesByLabel(labelId: any){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Label/GetNoteByLabel?userId=${userId}&labelId=${labelId}`, true, this.header);
  }

  GetLabelsByNote(noteId: number){
    return this.httpService.get(`${environment.baseUrl}/api/Label/GetLabelByNoteId?noteId=${noteId}`, true, this.header);
  }

  AddLabel(labelName: any){
    const params = {
      LabelName: labelName,
      UserId: this.user.UserId
    }
    return this.httpService.post(`${environment.baseUrl}/api/Label/CreateLabel`,params, true, this.header);
  }

  DeleteLabel(labelName: any){
    var userId = this.user.UserId;
    return this.httpService.delete(`${environment.baseUrl}/api/Label/DeleteLabel?userId=${userId}&labelName=${labelName}`, true, this.header);
  }

  EditLabel(label:any, data:any){
    var userId = this.user.UserId;
    const params = {
      LabelName:label,
      NewLabelName:data,
      UserId:userId
    }
    return this.httpService.put(`${environment.baseUrl}/api/Label/EditLabel`, params, true, this.header);
  }

  RemoveLabel(labelId: any){
    return this.httpService.delete(`${environment.baseUrl}/api/Label/RemoveLabel?labelId=${labelId}`, true, this.header);
  }
}
