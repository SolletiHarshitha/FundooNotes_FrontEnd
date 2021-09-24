import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  CreateNoteForm !: FormGroup;
  show = false;
  isPin = false;
  noteColor = "white";
  create: any;

  constructor(
    private noteService: NoteServiceService,
    public snackBar : MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    this.CreateNoteForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });
  }

  AddNote(){
    const params = {
      title : this.CreateNoteForm.value.title,
      description : this.CreateNoteForm.value.description,
    }
    this.noteService.CreateNote(params)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        duration:5000,
        verticalPosition:'bottom',
        horizontalPosition:'left'
      });
      this.show = false;
      this.CreateNoteForm.reset();
    }, (error: HttpErrorResponse) => {
      if(!error.error.status){
        this.snackBar.open(`${error.error.message}`, '', {
          duration:5000,
          verticalPosition:'bottom',
          horizontalPosition:'left'
        });
      }
    })
  }
}
