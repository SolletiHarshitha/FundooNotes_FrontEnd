import { Component, OnInit } from '@angular/core';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
import { MatGridAvatarCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

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
  getNotes="Notes"

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    var userData = localStorage.getItem('FundooUser');
    this.name = JSON.parse(userData!).FirstName;
    this.email = JSON.parse(userData!).Email;
  }
  
  LogOut(){
    localStorage.removeItem('FundooUser');
    this.router.navigateByUrl('/login');
  }

}
