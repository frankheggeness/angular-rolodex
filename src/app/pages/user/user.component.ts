import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';

import { SessionService } from 'src/app/services/session.service';

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
  user: {
    loggedIn: boolean;
    username: string;
    id: number;
  };
  constructor(private backend: BackendService, private session: SessionService) {
    this.user = this.session.getSession();
  }

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
    this.backend.getUserContacts(this.user.id).then((data: UsersResponse[]) => {
      console.log(data);
      this.contacts = data;
    });
  }

  deleteContact(postId: number) {
    this.backend.deleteContact(postId).then(() => {
      this.message = 'Contact Deleted!';
      this.backend.getUserContacts(this.user.id).then((data: UsersResponse[]) => {
        console.log(data);
        this.contacts = data;
      });
    });
  }
}
