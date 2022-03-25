import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

// isLogIn()

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public _AuthService: AuthService, private _Router: Router) {}
  token: any;
  decoded: any;
  ngOnInit(): void {
    this.token = localStorage.getItem('TOKEN');
    this.decoded = jwt_decode(this.token || '{}');
  }

  clickNav() {
    const nav = document.querySelector('#navbarSupportedContent');
    nav?.classList.remove('show');
  }

  logOut() {
    localStorage.removeItem('TOKEN');
    this._Router.navigate(['/sign-in']);
  }
}
