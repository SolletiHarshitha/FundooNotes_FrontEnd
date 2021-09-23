import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';

@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})
export class GetArchiveComponent implements OnInit {
  notes: any = [];

  constructor(
    private noteService:NoteServiceService
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
}
