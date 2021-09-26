import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  add = false;
  delete = false;
  update = false;
  labels: any = [];

  constructor(
    private labelService: LabelServiceService,
    public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public snackBar:MatSnackBar,
    private dataService: DataServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.dataService.currentData
    .subscribe((result:boolean)=>{
      if(result){
        this.dataService.changeMessage(false);
      }
    })
  }

  AddLabel(labeldata:any){
    console.log(labeldata);
    this.labelService.AddLabel(labeldata.name)
    .subscribe((result:any)=>{
      console.log(result);
      this.data.name="";
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  DeleteLabel(label:any){
    this.labelService.DeleteLabel(label.labelName)
    .subscribe((result:any)=>{
      console.log(result);
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  EditLabel(label:any,data: any){
    console.log(label);
    this.labelService.EditLabel(label.labelName, data.edit)
    .subscribe((result:any)=>{
      console.log(result);
      this.dataService.changeMessage(result.status);
    })
    this.ngOnInit();
  }

  done(){
    if(this.data.name!=null)
    {
      this.AddLabel(this.data);
    }
  }
}