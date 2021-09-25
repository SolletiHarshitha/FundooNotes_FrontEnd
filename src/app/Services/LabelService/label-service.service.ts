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

  GetNotesByLabel(labelName: any){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Label/GetNoteByLabel?userId=${userId}&&labelName=${labelName}`, true, this.header);
  }

  GetLabelsByNote(noteId: number){
    return this.httpService.get(`${environment.baseUrl}/api/Label/GetLabelByNoteId?noteId=${noteId}`, true, this.header);
  }

  AddLabel(label: any){
    const params = {
      LabelName: label.labelName,
      UserId: this.user.UserId
    }
    return this.httpService.post(`${environment.baseUrl}/api/Label/CreateLabel`,params, true, this.header);
  }

  DeleteLabel(label: any){
    return this.httpService.delete(`${environment.baseUrl}/api/Label/DeleteLabel`, true, this.header);
  }

  EditLabel(label:any){
    var userId = this.user.UserId;
    const params = {
      LabelId:label.labelId,
      LabelName:label.name,
      UserId:this.user.UserId
    }
    return this.httpService.put(`${environment.baseUrl}/api/Label/EditLabel`, null, true, this.header);
  }

  RemoveLabel(labelId: any){
    return this.httpService.delete(`${environment.baseUrl}/api/Label/RemoveLabel?labelId=${labelId}`, true, this.header);
  }
}
