import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-get-reminders',
  templateUrl: './get-reminders.component.html',
  styleUrls: ['./get-reminders.component.scss']
})
export class GetRemindersComponent implements OnInit {
  notes: any = [];

  constructor(
    private noteService:NoteServiceService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.GetReminder();

    this.dataService.currentData
    .subscribe((result:boolean)=>{
      if(result){
        this.GetReminder();
        this.dataService.changeMessage(false);
      }
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

  GetReminder(){
    this.noteService.GetReminderNotes()
    .subscribe((result: any)=>{
      console.log(result);
      this.notes = result.data;
      console.log(this.notes);
    })
  }

  OpenEditNote(note:any): void{
    let dialogRef = this.dialog.open(EditNoteComponent, {
      height: 'fit-content',
      width: '50%',
      minHeight: '50%',
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
