import { Component, OnInit } from '@angular/core';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';

@Component({
  selector: 'app-get-notes-by-label',
  templateUrl: './get-notes-by-label.component.html',
  styleUrls: ['./get-notes-by-label.component.scss']
})
export class GetNotesByLabelComponent implements OnInit {
  notes:any = [];
  labels:any;

  constructor(
    private labelService: LabelServiceService
  ) { }

  ngOnInit(): void {
    this.getNotesByLabel();
  }

  getNotesByLabel(){
    this.labelService.GetNotesByLabel(this.labels.labelId)
    .subscribe((result: any)=>{
      console.log(result);
      this.notes = result.data;
      console.log(this.notes);

    })
  }
}
