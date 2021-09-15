import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  hide = true;

  constructor() { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z]{1,}[a-z0-9]*[-.+]{0,1}[a-z0-9]+@([a-z0-9]+)(\\.[a-z]{2,}){1,2}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9.!@$-_]{8,}'), Validators.minLength(8)])
    });
  }

}
