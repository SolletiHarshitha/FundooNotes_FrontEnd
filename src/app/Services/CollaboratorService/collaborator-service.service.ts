import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorServiceService {
  user = JSON.parse(localStorage.getItem('FundooUser')!);

  constructor(
    private httpService: HttpServiceService
  ) { }

  header = {
    headers: { Authorization: "Bearer " + this.user.Token},
  }

  GetCollaborator(noteId:any){
    return this.httpService.get(`${environment.baseUrl}/api/Collaborator/GetCollaborator?noteId=${noteId}`, true, this.header);
  }

  AddCollaborator(data:any){
    const params = {
      NoteId : data.noteId,
      Email : data.email
    }
    return this.httpService.post(`${environment.baseUrl}/api/Collaborator/AddCollaborator`,params, true, this.header);
  }

  DeleteCollaborator(collaboratorId: any){
    return this.httpService.delete(`${environment.baseUrl}/api/Collaborator/RemoveCollaborator?noteId=${collaboratorId}`, true, this.header);
  }
}
