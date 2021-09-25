import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCollaboratorComponent } from '../add-collaborator/add-collaborator.component';


@Component({
  selector: 'app-note-icons',
  templateUrl: './note-icons.component.html',
  styleUrls: ['./note-icons.component.scss']
})
export class NoteIconsComponent implements OnInit {
  archive : any;
  email: string = "";

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
      "color" : "rgb(230, 230, 91);", "toolTip": "yellow", "icon" : false
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
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  @Input() notes: any;

  OpenCollaborator(): void {
    const dialogRef = this.dialog.open(AddCollaboratorComponent, {
      width: '600px'
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

  isArchive(){
    if(this.archive == true){
      this.noteService.Archive(this.notes.noteId)
      .subscribe((result:any)=>{
        console.log(result);
        this.snackBar.open(`${result.message}`, '', {
          verticalPosition:"bottom",
          horizontalPosition:"left",
          duration:5000});
      })
    }
    else{
      this.noteService.Unarchive(this.notes.noteId)
      .subscribe((result:any)=>{
        console.log(result);
        this.snackBar.open(`${result.message}`, '', {
          verticalPosition:"bottom",
          horizontalPosition:"left",
          duration:5000});
      })
    }
  }
}
