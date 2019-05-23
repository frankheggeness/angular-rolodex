import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';
interface UsersResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  address: string;
  password: string;
}

@Component({
  selector: 'app-newCard',
  templateUrl: './newCard.component.html',
  styleUrls: ['./newCard.component.scss'],
})
export class NewCardComponent implements OnInit {
  user: {
    loggedIn: boolean;
    username: string;
    id: number;
  };
  constructor(private backend: BackendService, private session: SessionService) {
    this.user = this.session.getSession();
  }

  newContact: {
    phone: number;
    name: string;
    email: string;
    address: string;
    github: string;
    // created_by: any;
  } = {
    phone: 1234567,
    name: '',
    email: '',
    address: '',
    github: '',
    // created_by: '',
  };

  message = '';

  ngOnInit() {}

  // this.Router.navigate

  submitForm() {
    console.log(this.user);
    const { phone, name, email, address, github } = this.newContact;
    this.backend.createContact(phone, name, email, address, github, this.user.id).then((data: UsersResponse[]) => {
      this.message = 'Contact Created!';
    });
  }
}
