import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  hide = true;

  constructor() { }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-z]{1}[A-Za-z]{2,}'), Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-z]{1}[A-Za-z]{2,}'), Validators.minLength(3)]),
      userName: new FormControl('', [Validators.required, Validators.pattern('^[a-z]{1,}[a-z0-9]*[-.+]{0,1}[a-z0-9]+@([a-z0-9]+)(\\.[a-z]{2,}){1,2}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9.!@$-_]{8,}'), Validators.minLength(8)]),
      cpassword: new FormControl('', [Validators.required])
    });
  }
}
