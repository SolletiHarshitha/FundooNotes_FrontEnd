import { Component, OnInit } from '@angular/core';
import { CollaboratorServiceService } from 'src/app/Services/CollaboratorService/collaborator-service.service';

@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  userName = this.user.FirstName;
  email = this.user.Email;
  collaborators: any;
  data:any;

  constructor(
    private collaboratorService:CollaboratorServiceService
  ) { }

  ngOnInit(): void {
    this.getCollaborators(this.data);
  }

  getCollaborators(data: any){
    this.collaboratorService.GetCollaborator(data.noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.collaborators = result.data;
      console.log(this.collaborators);
    })
  }

  AddCollaborator(){
    this.collaboratorService.AddCollaborator(this.data)
    .subscribe((result:any)=>{
      console.log(result);
      this.ngOnInit();
      this.data.email="";
    })
  }

  DeleteCollaborator(collaborator:any){
    this.collaboratorService.DeleteCollaborator(this.data)
    .subscribe((result:any)=>{
      console.log(result);
      this.ngOnInit()
    })
  }
}
