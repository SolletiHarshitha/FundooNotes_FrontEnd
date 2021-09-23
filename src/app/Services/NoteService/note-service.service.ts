import { Injectable } from '@angular/core';
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

  GetArchive(){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Note/GetArchiveNotes?userId=${userId}`, true, this.header);
  }

  Archive(noteId:any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/Archive?noteId=${noteId}`, null, true, this.header);
  }

  Unarchive(noteId:any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/UnArchive?noteId=${noteId}`, null, true, this.header);
  }

  GetTrashNotes(){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Note/GetTrashNotes?userId=${userId}`, true, this.header);
  }

  EmptyTrash(){
    var userId = this.user.UserId;
    return this.httpService.delete(`${environment.baseUrl}/api/Note/EmptyTrash?userId=${userId}`, true, this.header);
  }

  DeleteForever(noteId: any)
  {
    return this.httpService.delete(`${environment.baseUrl}/api/Note/DeleteForever?noteId=${noteId}`, true, this.header);
  }

  Restore(noteId: any)
  {
    return this.httpService.put(`${environment.baseUrl}/api/Note/RestoreNote?noteId=${noteId}`,null, true, this.header);
  }
}
