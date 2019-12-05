import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  
  constructor(private formBuild: FormBuilder, private router: Router, private authService: AuthServiceService) { }

  ngOnInit() {
    console.log("login");
    this.loginForm = this.formBuild.group({
      userId: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }
  get userId() {
    return this.loginForm.get('userId');
  }
  get password() {
    return this.loginForm.get('password');
  }
  toSignupUser() {
    this.router.navigate(['/signup', 'user'])
  }
  toSignupAdmin() {
    this.router.navigate(['/signup', 'admin'])
  }

}
