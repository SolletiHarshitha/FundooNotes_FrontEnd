import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  CreateNoteForm !: FormGroup;
  show = false;
  constructor() { }

  ngOnInit(): void {
    this.CreateNoteForm = new FormGroup({
      Title: new FormControl(),
      Description: new FormControl()
    });
  }

}
