import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordForm!: FormGroup;
  hide = true;

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.ResetPasswordForm = new FormGroup({
     // email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required])
    });
  }

  ResetPassword(){
    var data = localStorage.getItem('FundooForgot');
    var email = JSON.parse(data!).Email;
    if(data != null){
    this.userService.ResetPassword(email, this.ResetPasswordForm.value)
    .subscribe((result : any)=>
    {
      console.log(result);
      this.snackBar.open(`${result.message}`, '', {
        duration:5000
      });
      if(result.status == true){
        this.router.navigateByUrl('/login');
      }
    }, (error: HttpErrorResponse) => {
      if(!error.error.status){
        this.snackBar.open(`${error.error.message}`, '', {
          duration:5000
        });
      }
    })
  }
  }
}
