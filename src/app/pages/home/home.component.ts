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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private backend: BackendService) {}

  contacts: {
    id: number;
    username: string;
    name: string;
    email: string;
    address: string;
    password: string;
  }[] = [];

  inputObject: {
    input: string;
  } = {
    input: '',
  };

  ngOnInit() {}

  sendSearch() {
    console.log(this.inputObject);
    this.backend.searchContacts(this.inputObject.input).then((data: object) => {
      console.log({
        testkey: 'testval',
      });
      this.contacts = data.contacts;
      console.log('#$@#$@$CONTACTS', this.contacts);
    });
  }
}
