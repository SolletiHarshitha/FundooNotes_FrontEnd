import { Component, OnInit } from '@angular/core';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
import { MatGridAvatarCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { LabelServiceService } from 'src/app/Services/LabelService/label-service.service';

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
  getNotes="Notes";
  labels: any = [];
  labelNote:any;

  constructor(
    private router: Router,
    private labelService: LabelServiceService
  ) { }

  ngOnInit(): void {
    var userData = localStorage.getItem('FundooUser');
    this.name = JSON.parse(userData!).FirstName;
    this.email = JSON.parse(userData!).Email;

    this.GetLabels();
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
}
