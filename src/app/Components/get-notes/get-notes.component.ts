import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-get-notes',
  templateUrl: './get-notes.component.html',
  styleUrls: ['./get-notes.component.scss']
})
export class GetNotesComponent implements OnInit {
  notes: any = [];
  show = false;
  isPin = false;

  constructor(
    private noteService:NoteServiceService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.GetNotes();
  }

  GetNotes(){
    this.noteService.GetNotes()
    .subscribe((result: any)=>{
      console.log(result);
      this.notes = result.data;
      console.log(this.notes);
    });
  }

  OpenNote(note:any){
    let dialogRef = this.dialog.open(EditNoteComponent, {
      height: 'fit-content',
      width: 'fit-content',
      data: {note}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
    });
  }
}
