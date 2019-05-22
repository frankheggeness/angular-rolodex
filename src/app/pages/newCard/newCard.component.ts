import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
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
  constructor(private backend: BackendService) {}

  newContact: {
    phone: number;
    name: string;
    email: string;
    address: string;
    github: string;
    created_by: number;
  } = {
    phone: 1234567,
    name: '',
    email: '',
    address: '',
    github: '',
    created_by: 1,
  };

  message = '';

  ngOnInit() {}

  // this.Router.navigate

  submitForm() {
    const { phone, name, email, address, github, created_by } = this.newContact;
    this.backend.createContact(phone, name, email, address, github, created_by).then((data: UsersResponse[]) => {
      this.message = 'Contact Created!';
    });
  }
}
