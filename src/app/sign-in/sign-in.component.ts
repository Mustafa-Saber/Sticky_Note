import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isWating: boolean = false;

  signIn: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    $('#signIn').particleground({
      density: 9000,
    });
  }

  SignInForms() {
    this.isWating = true;

    this._AuthService.signIn(this.signIn.value).subscribe((res) => {
      if (res.message == 'success') {
        this._Router.navigate(['/profile']);
        localStorage.setItem('TOKEN', res.token);
        this.isWating = true;
      } else {
        this.isWating = false;
      }
    });
  }
}
