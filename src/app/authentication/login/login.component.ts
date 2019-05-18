import { LoginResponse } from './../dto/login.dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initialLoginForm();
  }

  initialLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.login(this.loginFormGroup.getRawValue())
      .subscribe((response: LoginResponse) => {
        this.router.navigate(['/bookList']);
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      }
      );
  }
}
