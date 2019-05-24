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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: {
    loggedIn: boolean;
    username: string;
    id: number;
  };
  constructor(private backend: BackendService, private session: SessionService) {
    this.user = this.session.getSession();
  }

  // contacts: {
  //   id: number;
  //   username: string;
  //   name: string;
  //   email: string;
  //   address: string;
  //   password: string;
  // }[] = [];

  contacts: any;

  inputObject: {
    input: string;
  } = {
    input: '',
  };

  ngOnInit() {}

  sendSearch() {
    if (this.inputObject.input === '') {
      this.contacts = null;
      console.log('empty');
      return;
    } else {
      console.log(this.inputObject);
      this.backend.searchContacts(this.inputObject.input, this.user.id).then((data: any) => {
        // console.log({
        //   testkey: 'testval',
        // });
        console.log(data);
        console.log('banana');
        if (data.contacts) {
          this.contacts = data.contacts;
        }
        console.log('#$@#$@$CONTACTS', this.contacts);
      });
    }
  }
}
