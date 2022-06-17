import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private route: Router) {}
  login(data: any) {
    return this.http.post<{ message: string; user: any }>(
      'http://localhost:5000/user/login',
      data
    );
  }

  saveSession(token: any, islogged: any) {
    const decodedToken = this.helper.decodeToken(token);
    console.log(decodedToken);
    localStorage.setItem('token', token);
    localStorage.setItem('decodedToken', decodedToken);
    if (decodedToken.type === 'admin') {
      this.route.navigate(['admin']);
    } else {
      this.route.navigate(['']);
    }
  }
}
