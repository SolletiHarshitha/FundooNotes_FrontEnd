import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from '../Services/NoteService/note-service.service';
@Component({
  selector: 'app-get-notes',
  templateUrl: './get-notes.component.html',
  styleUrls: ['./get-notes.component.scss']
})
export class GetNotesComponent implements OnInit {
  notes: any = [];

  constructor(
    private noteService:NoteServiceService
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
}
