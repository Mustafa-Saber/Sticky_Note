import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isSuccess: boolean = false;
  isUniuqeEmail: boolean = false;
  isUniuqeEmailMessage: string = '';
  isWating: boolean = false;
  price: number = 10000;
  constructor(private _AuthService: AuthService) {}

  signUp: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
    ]),
  });
  signUpForm(signUp: FormGroup) {
    this.isWating = true;
    this._AuthService.signUp(signUp.value).subscribe((res) => {
      if (this.signUp.status == 'VALID') {
        if (res.message == 'success') {
          this.isSuccess = true;
          this.isUniuqeEmail = false;
          this.signUp.reset();
          this.isWating = false;
        } else {
          this.isUniuqeEmail = true;
          this.isSuccess = false;
          this.isUniuqeEmailMessage = res.message;
          this.isWating = false;
        }
      } else {
        this.isWating = false;
      }
    });
  }

  ngOnInit(): void {
    //  particle.Js ...
    $('#sign-up').particleground({
      density: 9000,
    });
  }
}
