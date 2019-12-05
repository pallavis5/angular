import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.css']
})
export class SuperuserComponent implements OnInit {

  adminList: User[]

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {

    this.authService.adminDetails().subscribe(
      (data) => {
      this.adminList = data;
      });
  }

  acceptAdmin(user: User) {
    user.status = "A";
    this.authService.response(user).subscribe(
      data => { user = data });
  }
  declineAdmin(user: User) {
    user.status = "D";
    this.authService.response(user).subscribe(
      data => { user = data });
  }

}
