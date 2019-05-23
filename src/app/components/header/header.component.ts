// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss'],
// })
// export class HeaderComponent {
//   constructor() {}
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: {
    loggedIn: boolean;
    username: string;
  };

  constructor(private auth: AuthService, private router: Router, private session: SessionService) {
    this.user = this.session.getSession();
  }

  isLoggedIn() {
    return this.session.isLoggedIn();
  }

  login() {
    return this.router.navigate(['/login']);
  }
  logout() {
    return this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
