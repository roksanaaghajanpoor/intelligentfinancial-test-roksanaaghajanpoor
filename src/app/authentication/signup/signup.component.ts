import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatchValidator } from 'src/validators/match-validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initialLoginForm();
  }

  initialLoginForm() {
    this.signupFormGroup = this.formBuilder.group({
      NationalCode: ['', Validators.required],
      MobileNumber: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    },
    { validator: MatchValidator.Match('Password', 'ConfirmPassword') });
  }

  onSubmit() {
    if (this.signupFormGroup.valid) {
      this.authService.signup(this.signupFormGroup.getRawValue())
      .subscribe((response) => {
        console.log(response);
        this.signupFormGroup.reset();
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.signupFormGroup.reset();
      });
    } 
  }
}
