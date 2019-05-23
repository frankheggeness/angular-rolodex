import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  user = {
    loggedIn: false,
    username: '',
    id: null,
  };

  constructor() {
    const userString = window.localStorage.getItem('user');

    try {
      if (userString) {
        this.user = JSON.parse(userString);
      } else {
        console.log('user was not found');
      }
    } catch (err) {
      console.log('could not parse user');
    }
  }

  getSession() {
    return this.user;
  }

  setSession(username, id) {
    // save to memory
    this.user.username = username;
    this.user.loggedIn = true;
    this.user.id = id;

    // save to local storage
    const userString = JSON.stringify(this.user);
    window.localStorage.setItem('user', userString);
  }

  clearSession() {
    this.user.username = '';
    this.user.loggedIn = false;
    window.localStorage.removeItem('user');
  }

  // helper method

  isLoggedIn() {
    return this.user.loggedIn;
  }
}
