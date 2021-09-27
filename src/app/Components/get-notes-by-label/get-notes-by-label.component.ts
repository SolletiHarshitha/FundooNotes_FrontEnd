import { Component, OnInit, Input } from '@angular/core';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-get-notes-by-label',
  templateUrl: './get-notes-by-label.component.html',
  styleUrls: ['./get-notes-by-label.component.scss']
})
export class GetNotesByLabelComponent implements OnInit {
  notes:any = [];
  @Input() labels:any;

  constructor(
    private labelService: LabelServiceService,
    private dialog: MatDialog,
    private noteService: NoteServiceService,
    private snackBar: MatSnackBar,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.getNotesByLabel();
    this.dataService.currentData
    .subscribe((result:boolean)=>{
      if(result){
        this.getNotesByLabel();
        this.dataService.changeMessage(false);
      }
    })
  }

  getNotesByLabel(){
    console.log(this.labels);
    this.labelService.GetNotesByLabel(this.labels.labelId)
    .subscribe((result: any)=>{
      console.log(result);
      this.notes = result.data;
      console.log(this.notes);
    })
  }

  pinNote(noteId:any){
    this.noteService.PinNote(noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:3000
      });
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  unpinNote(noteId:any){
    this.noteService.UnpinNote(noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:3000
      });
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  OpenEditNote(note:any): void{
    let dialogRef = this.dialog.open(EditNoteComponent, {
      height: 'fit-content',
      width: '50%',
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
        duration:3000
      });
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  RemoveImage(note:any){
    console.log(note.noteId);
    this.noteService.RemoveImage(note.noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:5000
      });
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }
}
