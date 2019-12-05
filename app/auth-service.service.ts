import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './site/User';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authenticationApiUrl = environment.baseUrl;
  loggedInUser = { loggedOut: true };
  validCredentials: boolean = true;
  loggedIn: boolean = false;
  userRole: string;
  userid: string;
  private token: string;
  isAdmin: boolean = false;
  type: string;
  isUser: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {

  }

  authenticate(username: string, password: string): Observable<any> {
    let credentials = btoa(username + ':' + password);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + credentials);
    return this.httpClient.get(this.authenticationApiUrl + 'authenticate', { headers });
  }

  public setToken(token: string) {
    this.token = token;
  }
  public getToken() {
    return this.token;
  }


  authenticateUser(user) {
    console.log("auth")
    this.authenticate(user.userId, user.password).subscribe(
      (data) => {
        this.loggedInUser = user;
        this.validCredentials = true;
        this.userRole = data.role;
        this.userid = data.username;
        console.log(data.username)

        if (this.userRole == 'superuser') {
          alert('Superuser login successful')
          this.router.navigate(['superuser'])
        }
        if (this.userRole == 'admin') {
          this.isAdmin = true;
          this.isUser = false;
          alert('Admin login successful')
          this.router.navigate(['search-bar'])
        }
        if (this.userRole == 'user') {
          this.isAdmin = false;
          this.isUser = true;
          alert('User login successful')
          this.router.navigate(['search-bar'])
        }
        this.loggedIn = true;
        this.setToken(data.token);
        console.log("login success")
      },
      (error) => {
        this.validCredentials = false;
      })
  }

  logout() {
    this.loggedInUser = { loggedOut: true };
    this.isAdmin = false;
    this.loggedIn = false;
    this.isUser = false;
    this.setToken(null);
    alert('Logged out successfully')
    this.router.navigate(['login']);
  }
  addUser(user: User) {
    if (this.type == "user") {
      // console.log(user);
      return this.httpClient.post<User>(this.authenticationApiUrl + 'users/user', user);
    }
    else {
      return this.httpClient.post<User>(this.authenticationApiUrl + 'users/admin', user);
    }
  }
  adminDetails(): Observable<User[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.getToken());
    return this.httpClient.get<User[]>(this.authenticationApiUrl + 'users/admin', { headers });
  }

  response(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.getToken());
    return this.httpClient.put<User>(this.authenticationApiUrl + 'users', user, { headers });
  }
}
