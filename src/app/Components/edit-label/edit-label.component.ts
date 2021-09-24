import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
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
}