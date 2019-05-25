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

  emailInvalid = true;
  emailErrorMessage = '';

  addressInvalid = true;
  addressErrorMessage = '';

  passwordInvalid = true;
  passwordErrorMessage = '';

  usernameInvalid = true;
  usernameErrorMessage = '';

  nameInvalid = true;
  nameErrorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  validateEmail() {
    const { email } = this.formData;

    if (!email) {
      this.emailErrorMessage = 'Email is required to register.';
      return (this.emailInvalid = true);
    } else if (!email.includes('@')) {
      this.emailErrorMessage = 'Email needs to be formatted';
      return (this.emailInvalid = true);
    }
    this.emailErrorMessage = '';
    return (this.emailInvalid = false);
  }

  validateAddress() {
    const { address } = this.formData;

    if (!address) {
      this.addressErrorMessage = 'Address is required.';
      return (this.addressInvalid = true);
    } else if (address.length < 3) {
      this.addressErrorMessage = 'Address is too short.';
      return (this.addressInvalid = true);
    }
    this.addressErrorMessage = '';
    return (this.addressInvalid = false);
  }

  validatePassword() {
    const { password } = this.formData;

    if (!password) {
      this.passwordErrorMessage = 'Password is required.';
      return (this.passwordInvalid = true);
    } else if (password.length < 5) {
      this.passwordErrorMessage = 'Password is too short.';
      return (this.passwordInvalid = true);
    }
    this.passwordErrorMessage = '';
    return (this.passwordInvalid = false);
  }

  validateUsername() {
    const { username } = this.formData;

    if (!username) {
      this.usernameErrorMessage = 'Username is required.';
      return (this.usernameInvalid = true);
    } else if (username.length < 5) {
      this.usernameErrorMessage = 'Username is too short.';
      return (this.usernameInvalid = true);
    }
    this.usernameErrorMessage = '';
    return (this.usernameInvalid = false);
  }

  validateName() {
    const { name } = this.formData;

    if (!name) {
      this.nameErrorMessage = 'Name is required.';
      return (this.nameInvalid = true);
    } else if (name.length < 5) {
      this.nameErrorMessage = 'Name is too short.';
      return (this.nameInvalid = true);
    }
    this.nameErrorMessage = '';
    return (this.nameInvalid = false);
  }

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
