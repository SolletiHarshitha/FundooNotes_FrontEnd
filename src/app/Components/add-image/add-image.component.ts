import { Component, OnInit,Inject, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { NoteServiceService } from 'src/app/Services/NoteService/note-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false;
  file!: File;

  constructor(
    private noteService: NoteServiceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
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

  onChange(event: any){
    this.file= event.target.files[0];
  }

  onUpload(){
    this.loading = !this.loading;
    console.log(this.file);
    console.log(this.data);
    this.noteService.AddImage(this.data.noteId,this.file)
    .subscribe((result:any)=>{
      console.log(this.data.noteId);
      if(typeof(result)==='object'){
        this.shortLink = result.link;
        this.loading = false;
      }
    });
    this.dataService.changeMessage(true);
    this.ngOnInit();
  }
}
