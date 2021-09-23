import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';

@Component({
  selector: 'app-get-reminders',
  templateUrl: './get-reminders.component.html',
  styleUrls: ['./get-reminders.component.scss']
})
export class GetRemindersComponent implements OnInit {
  notes: any = [];

  constructor(
    private noteService:NoteServiceService
  ) { }

  ngOnInit(): void {
    this.GetReminder();
  }

  GetReminder(){
    this.noteService.GetReminderNotes()
    .subscribe((result: any)=>{
      console.log(result);
      this.notes = result.data;
      console.log(this.notes);
    })
  }
}
