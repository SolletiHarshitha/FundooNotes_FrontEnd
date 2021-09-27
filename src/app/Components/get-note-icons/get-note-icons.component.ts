import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { AddImageComponent } from '../add-image/add-image.component';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';

@Component({
  selector: 'app-get-note-icons',
  templateUrl: './get-note-icons.component.html',
  styleUrls: ['./get-note-icons.component.scss']
})
export class GetNoteIconsComponent implements OnInit {
  archive:any;
  email: string = "";
  moreMenu = false;
  remindMe = false;
  file!: File;
  image:any;
  labels:any;

  reminders: any = [] = [
    {
      "Remind":"Later Today 8:00PM"
    },
    {
      "Remind":"Tomorrow 8:00AM"
    },
    {
      "Remind":"Next Week, Mon, 8:00AM"
    }
  ]

  noteColor: any = "white";
  colorsList: any = [] = [
    {
      "color" : "white", "toolTip": "default", "icon" : true
    },
    {
      "color" : "rgb(230, 107, 107)", "toolTip": "red", "icon" : false
    },
    {
      "color" : "rgb(223, 158, 39)", "toolTip": "orange", "icon" : false
    },
    {
      "color" : "rgb(230, 230, 91)", "toolTip": "yellow", "icon" : false
    },
    {
      "color" : "rgb(105, 202, 105)", "toolTip": "green", "icon" : false
    },
    {
      "color" : "rgb(116, 235, 235)", "toolTip": "teal", "icon" : false
    },
    {
      "color" : "rgb(173, 173, 211)", "toolTip": "blue", "icon" : false
    },
    {
      "color" : "rgb(91, 91, 168)", "toolTip": "dark blue", "icon" : false
    },
    {
      "color" : "rgb(194, 144, 194)", "toolTip": "purple", "icon" : false
    },
    {
      "color" : "rgb(243, 201, 208)", "toolTip": "pink", "icon" : false
    },
    {
      "color" : "rgb(192, 141, 141)", "toolTip": "brown", "icon" : false
    },
    {
      "color" : "rgb(128, 128, 128)", "toolTip": "gray", "icon" : false
    },
  ]

  constructor(
    private noteService:NoteServiceService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private dataService: DataServiceService,
    private labelService: LabelServiceService
  ) { }

  ngOnInit(): void {
    this.archive= this.notes.archive
    this.getLabel();
    this.dataService.currentData
    .subscribe((result: any)=>{
      if(result){
        this.dataService.changeMessage(false);
      }
    })
  }

  @Input() notes: any;

  isArchive(){
    if(this.archive == true){
      this.noteService.Archive(this.notes.noteId)
      .subscribe((result:any)=>{
        console.log(result);
        this.snackBar.open(`${result.message}`, '', {
          verticalPosition:"bottom",
          horizontalPosition:"left",
          duration:5000
        });
        this.dataService.changeMessage(result.status);
      })
    }
    else{
      this.noteService.Unarchive(this.notes.noteId)
      .subscribe((result:any)=>{
        console.log(result);
        this.snackBar.open(`${result.message}`, '', {
          verticalPosition:"bottom",
          horizontalPosition:"left",
          duration:5000
        });
        this.dataService.changeMessage(result.status);
      })
    }
  }

  OpenCollaborator(): void {
    const dialogRef = this.dialog.open(AddCollaboratorComponent, {
      width: '40%',
      data: {noteId: this.notes.noteId, email: this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }

  changecolor(color:any){
    this.noteColor = color;
    for(var col of this.colorsList){
      col.icon = col.color == color ? true : false;
    }
  }

  MoveIntoTrash(){
    this.noteService.MoveIntoTrash(this.notes.noteId)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:5000
      });
      this.dataService.changeMessage(result.status);
    })
  }

  OpenImage(): void {
    const dialogRef = this.dialog.open(AddImageComponent, {
      width: '40%',
      data: {noteId: this.notes.noteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }

  AddReminder(note: any, reminder: any){
    console.log(note);
      console.log(reminder);
    this.noteService.AddReminder(note.noteId,reminder.Remind)
    .subscribe((result:any)=>{
      this.snackBar.open(`${result.message}`, '', {
        verticalPosition:"bottom",
        horizontalPosition:"left",
        duration:5000
      });
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  getLabel(){
    this.labelService.GetLabels()
    .subscribe((result:any)=>{
      this.labels = result.data;
      console.log(this.labels);
      this.dataService.changeMessage(result.status);
    })
  }
}
