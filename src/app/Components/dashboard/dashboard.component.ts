import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expand = false;
  view = false;
  name = "";
  email = "";
  navButton="Notes";
  labels: any = [];
  labelName: any;
  labelNote:any;
  value="side";
  

  constructor(
    private router: Router,
    private labelService: LabelServiceService,
    public dialog: MatDialog,
    private dataService: DataServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    var userData = localStorage.getItem('FundooUser');
    this.name = JSON.parse(userData!).FirstName;
    this.email = JSON.parse(userData!).Email;

    this.GetLabels();

    this.dataService.currentData
    .subscribe((result:boolean)=>{
      if(result){
        this.GetLabels();
        this.dataService.changeMessage(false);
      }
    })
  }
  
  LogOut(){
    localStorage.removeItem('FundooUser');
    this.router.navigateByUrl('/login');
  }

  GetLabels()
  {
    this.labelService.GetLabels()
    .subscribe((result: any)=>{
      console.log(result);
      this.labels = result.data;
      console.log(this.labels);
    })
  }

  OpenEditLabel(): void {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: 'auto',
      height: 'fit-content',
      data: {labels: this.labels, labelName: this.labelName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }
}