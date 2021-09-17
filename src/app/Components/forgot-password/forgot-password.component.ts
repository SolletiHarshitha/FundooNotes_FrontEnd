import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPasswordForm!: FormGroup;

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ForgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ForgotPassword(){
    this.userService.ForgotPassword(this.ForgotPasswordForm.value)
    .subscribe((result: any)=>
    {
      console.log(result);
      this.openSnackBar(result.message, '');
    }, (error: HttpErrorResponse) => {
      if(!error.error.status){
        this.openSnackBar(error.error.message,'');
      }
    })
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
