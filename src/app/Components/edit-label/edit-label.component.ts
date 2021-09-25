import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';

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
    public snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  AddLabel(label: any){
    this.labelService.AddLabel(label.labelName)
    .subscribe((result:any)=>{
      console.log(result);
    })
  }
  DeleteLabel(label:any){
    this.labelService.DeleteLabel(label.labelName)
    .subscribe((result:any)=>{
      console.log(result);
    })
  }
  done(){
    if(this.data!=null)
    {
      this.AddLabel(this.data);
    }
  }
}