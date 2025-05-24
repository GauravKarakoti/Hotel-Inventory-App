import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string='';
  password: string='';
  constructor(private route:Router, private loginService: LoginService) {}
  login() {
    if(this.loginService.Login(this.email,this.password)) {
      this.route.navigate(['/rooms']);
    }
  }
}
