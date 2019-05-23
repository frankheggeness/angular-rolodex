import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    console.log(this.formData);
    this.auth
      .login(this.formData)
      .then(() => {
        console.log('user logged in');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }
}
