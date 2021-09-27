import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';

@Component({
  selector: 'app-get-notes',
  templateUrl: './get-notes.component.html',
  styleUrls: ['./get-notes.component.scss']
})
export class GetNotesComponent implements OnInit {
  pinNotes: any = [];
  unpinNotes: any = [];
  show = false;
  isPin = false;
  labels:any;

  constructor(
    private noteService:NoteServiceService,
    public dialog:MatDialog,
    public snackBar:MatSnackBar,
    public labelService:LabelServiceService,
    public dataService:DataServiceService
  ) { }

  ngOnInit(): void {
    this.GetPinNotes();
    this.GetUnpinNotes();
    this.dataService.currentData
    .subscribe((result:boolean)=>{
      if(result){
        this.GetPinNotes();
        this.GetUnpinNotes();
        this.dataService.changeMessage(false);
      }
    })
  }

  GetPinNotes(){
    this.noteService.GetPinNotes()
    .subscribe((result: any)=>{
      console.log(result);
      this.pinNotes = result.data;
      console.log(this.pinNotes);
    });
  }
  GetUnpinNotes(){
    this.noteService.GetUnpinNotes()
    .subscribe((result: any)=>{
      console.log(result);
      this.unpinNotes = result.data;
      console.log(this.unpinNotes);
    });
  }

  OpenEditNote(note:any): void{
    let dialogRef = this.dialog.open(EditNoteComponent, {
      height: 'fit-content',
      width: 'fit-content',
      minHeight: '50%',
      data: {note}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
    });
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

  GetLabel(noteId: any){
    this.labelService.GetLabelsByNote(noteId)
    .subscribe((result:any)=>{
      this.labels = result.data;
      return this.labels;
    })
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
