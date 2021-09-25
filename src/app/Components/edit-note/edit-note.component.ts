import { Component, OnInit, Inject } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  isPin = false;


  constructor(
    private noteService: NoteServiceService,
    public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public snackBar: MatSnackBar,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.dataService.currentData
    .subscribe((result:boolean)=>{
      if(result){
        this.dataService.changeMessage(false);
      }
    })
  }

  pinnote(noteId:any){
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

  EditNote(){
    this.noteService.EditNote(this.data)
    .subscribe((result:any)=>{
      console.log(result);
      console.log(this.data);
    })
  }
}
