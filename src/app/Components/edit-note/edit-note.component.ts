import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  isPin = false;
  data: any;

  constructor(
    private noteService: NoteServiceService
  ) { }

  ngOnInit(): void {
  }

  EditNote(){
    this.noteService.EditNote(this.data)
    .subscribe((result:any)=>{
      console.log(result);
      console.log(this.data);
    })
  }
}
