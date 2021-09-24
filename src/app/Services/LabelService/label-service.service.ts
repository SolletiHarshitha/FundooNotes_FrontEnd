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
    return this.httpService.get(`${environment.baseUrl}/api/Label/GetNoteByLabel?userId=${userId}`, true, this.header);
  }

  GetLabelsByNote(noteId: number){
    return this.httpService.get(`${environment.baseUrl}/api/Label/GetLabelByNoteId?noteId=${noteId}`, true, this.header);
  }

  AddLabel(label: any){
    const params = {
      LabelName: label,
      UserId: this.user.UserId
    }
    return this.httpService.post(`${environment.baseUrl}/api/Label/CreateLabel`,params, true, this.header);
  }

  DeleteLabel(label: any){
    return this.httpService.delete(`${environment.baseUrl}/api/Collaborator/DeleteLabel`, true, this.header);
  }
}
