import { Component, OnInit, Inject } from '@angular/core';
import { CollaboratorServiceService } from 'src/app/Services/CollaboratorService/collaborator-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  collaboratorForm!: FormGroup;

  constructor(
    private collaboratorService:CollaboratorServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddCollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.collaboratorForm = new FormGroup({
      collaboratorEmail: new FormControl('',[Validators.email])
    }),
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
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:3000
      });
      this.ngOnInit();
      this.data.email="";
    })
  }

  DeleteCollaborator(collaborator:any){
    this.collaboratorService.DeleteCollaborator(collaborator.collaboratorId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:3000});
      this.ngOnInit()
    })
  }
}
