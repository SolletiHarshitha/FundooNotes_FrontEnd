import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  hide = true;

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  Login(){
    this.userService.Login(this.LoginForm.value)
    .subscribe((result : any)=>
    {
      console.log(result);
      this.openSnackBar(result.message, '');
    })
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
