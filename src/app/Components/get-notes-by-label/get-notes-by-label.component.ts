import { Component, OnInit } from '@angular/core';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-notes-by-label',
  templateUrl: './get-notes-by-label.component.html',
  styleUrls: ['./get-notes-by-label.component.scss']
})
export class GetNotesByLabelComponent implements OnInit {
  notes:any = [];
  labels:any;

  constructor(
    private labelService: LabelServiceService,
    private dialog: MatDialog,
    private noteService: NoteServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getNotesByLabel();
  }

  getNotesByLabel(){
    this.labelService.GetNotesByLabel(this.labels.labelId)
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
