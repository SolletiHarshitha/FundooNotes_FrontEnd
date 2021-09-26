import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  GetPinNotes(){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Note/GetPinNotes?userId=${userId}`, true, this.header);
  }

  GetUnpinNotes(){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Note/GetUnpinNotes?userId=${userId}`, true, this.header);
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

  GetReminderNotes(){
    var userId = this.user.UserId;
    return this.httpService.get(`${environment.baseUrl}/api/Note/GetReminderNotes?userId=${userId}`, true, this.header);
  }
 
  EditNote(data: any){
    alert(data);
    const params = {
      Title : data.title,
      Description: data.description,
      NoteId: data.noteId
    }
    return this.httpService.put(`${environment.baseUrl}/api/Note/UpdateNote`,params, true, this.header);
  }

  MoveIntoTrash(noteId: number){
    return this.httpService.delete(`${environment.baseUrl}/api/Note/DeleteNote?noteId=${noteId}`, true, this.header);
  }

  AddReminder(noteId:any, reminder:any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/RemindMe?noteId=${noteId}&reminder=${reminder}`,null, true, this.header);
  }

  DeleteReminder(noteId:any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/DeleteReminder?noteId=${noteId}`,null, true, this.header);
  }

  Color(noteId: any, color: any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/Color?noteId=${noteId}&color=${color}`,null, true, this.header);
  }

  PinNote(noteId:any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/PinNote?noteId=${noteId}`,null, true, this.header);
  }

  UnpinNote(noteId:any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/UnPinNote?noteId=${noteId}`,null, true, this.header);
  }
  AddImage(noteId:any, file: any): Observable<any>{ 
    console.log(file);
    const formData = new FormData();
    formData.append('image',file,file);
    console.log(formData);
    return this.httpService.put(`${environment.baseUrl}/api/Note/AddImage?noteId=${noteId}`,formData, true, this.header);
  }
  RemoveImage(noteId:any){
    return this.httpService.put(`${environment.baseUrl}/api/Note/RemoveImage?noteId=${noteId}`,null, true, this.header);
  }
}
