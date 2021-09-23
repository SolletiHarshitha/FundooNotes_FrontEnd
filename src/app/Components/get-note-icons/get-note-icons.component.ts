import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';

@Component({
  selector: 'app-get-note-icons',
  templateUrl: './get-note-icons.component.html',
  styleUrls: ['./get-note-icons.component.scss']
})
export class GetNoteIconsComponent implements OnInit {
  archive:any;
  @Input() notes: any;

  constructor(
    private noteService:NoteServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  isArchive(){
    if(this.archive == true){
      this.noteService.Archive(this.notes.noteId)
      .subscribe((result:any)=>{
        console.log(result);
      })
    }
    else{
      this.noteService.Unarchive(this.notes.noteId)
      .subscribe((result:any)=>{
        console.log(result);
      })
    }
  }

  OpenCollaborator(){
    const dialogRef = this.dialog.open(AddCollaboratorComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
