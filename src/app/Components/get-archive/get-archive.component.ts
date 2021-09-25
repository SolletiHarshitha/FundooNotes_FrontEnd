import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})
export class GetArchiveComponent implements OnInit {
  notes: any = [];

  constructor(
    private noteService:NoteServiceService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.GetArchive();
  }

  GetArchive(){
    this.noteService.GetArchive()
    .subscribe((result: any)=>{
      console.log(result);
      this.notes = result.data;
      console.log(this.notes);
    })
  }
  OpenEditNote(note:any): void{
    let dialogRef = this.dialog.open(EditNoteComponent, {
      height: 'fit-content',
      width: '40%',
      data: {note}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
    });
  }

  DeleteReminder(note: any){
    this.noteService.DeleteReminder(note.noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:5000
      });
    })
    this.ngOnInit();
  }
}
