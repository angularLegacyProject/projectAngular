import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  dataReceived: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  auth(inp: NgForm) {
    let data = inp.value;

    this.authService.login(data).subscribe((user: any) => {
      this.authService.saveSession(user.token, user.status);
    });
  }
}
