import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formData: {
    username: string;
    name: string;
    password: string;
    email: string;
    address: string;
  } = {
    username: '',
    name: '',
    password: '',
    email: '',
    address: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  // register(){
  //   console.log(this.formData){
  //     this.auth.register(this.formData)
  //     .then(() =>{
  //       console.log('user registered')
  //       this.router.navigate(['/login']);
  //     })
  //     .catch((err) =>{
  //       console.log('error', err)
  //     })
  //   }
  // }

  register() {
    console.log(this.formData);
    this.auth
      .register(this.formData)
      .then(() => {
        console.log('user registered in');
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }

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
