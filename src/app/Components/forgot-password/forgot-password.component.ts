import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPasswordForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.ForgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z]{1,}[a-z0-9]*[-.+]{0,1}[a-z0-9]+@([a-z0-9]+)(\\.[a-z]{2,}){1,2}$')])
    });
  }

}
