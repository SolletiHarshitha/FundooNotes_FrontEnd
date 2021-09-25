import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-get-trash',
  templateUrl: './get-trash.component.html',
  styleUrls: ['./get-trash.component.scss']
})
export class GetTrashComponent implements OnInit {
  notes: any = [];

  constructor(
    private noteService:NoteServiceService,
    public snackBar: MatSnackBar,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.getTrashNotes();
    this.dataService.currentData
    .subscribe((result:boolean)=>{
      if(result){
        this.getTrashNotes();
        this.dataService.changeMessage(false);
      }
    })
  }

  getTrashNotes(){
    this.noteService.GetTrashNotes()
    .subscribe((result:any)=>{
      console.log(result);
      this.notes = result.data;
      console.log(this.notes);
    })
  }

  EmptyTrash(){
    this.noteService.EmptyTrash()
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:'bottom',
        horizontalPosition:'left',
        duration:3000
      });
      this.notes = result.data;
      console.log(this.notes);
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  deleteForever(note:any){
    this.noteService.DeleteForever(note.noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:'bottom',
        horizontalPosition:'left',
        duration:5000});
      this.notes = result.data;
      console.log(this.notes);
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  restore(note:any){
    this.noteService.Restore(note.noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:'bottom',
        horizontalPosition:'left',
        duration:5000});
      this.notes = result.data;
      console.log(this.notes);
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }
}
