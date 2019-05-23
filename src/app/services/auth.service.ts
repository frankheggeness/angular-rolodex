import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private backend: BackendService, private session: SessionService) {}

  register(data) {
    return this.backend.register(data);
  }

  login(data) {
    // console.log('AUTHEGWWGEGG', data);
    return this.backend.login(data).then((response: any) => {
      console.log('REPSOE', response);
      return this.session.setSession(response.username, response.id);
    });
  }

  isAuthenticated() {
    return this.session.isLoggedIn();
  }

  logout() {
    return this.backend.logout().then((response) => {
      return this.session.clearSession();
    });
  }
}
