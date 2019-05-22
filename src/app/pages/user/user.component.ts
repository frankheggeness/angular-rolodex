import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

interface UsersResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  address: string;
  password: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private backend: BackendService) {}

  contacts: {
    id: number;
    username: string;
    name: string;
    email: string;
    address: string;
    password: string;
  }[] = [];

  message = '';

  ngOnInit() {
    this.backend.getUserContacts().then((data: UsersResponse[]) => {
      console.log(data);
      this.contacts = data;
    });
  }

  deleteContact(id: number) {
    this.backend.deleteContact(id).then(() => {
      this.message = 'Contact Deleted!';
      this.backend.getUserContacts().then((data: UsersResponse[]) => {
        console.log(data);
        this.contacts = data;
      });
    });
  }
}
