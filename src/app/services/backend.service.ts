import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getUserContacts(id): Promise<object> {
    return this.http.get(`/api/contacts?user=${id}`).toPromise();
  }

  deleteContact(id: number): Promise<object> {
    return this.http.delete(`/api/contacts/${id}`).toPromise();
  }

  getSingleContact(id: number): Promise<object> {
    return this.http.get(`/api/contacts/${id}`).toPromise();
  }

  createContact(
    phone: number,
    name: string,
    email: string,
    address: string,
    github: string,
    created_by: number,
  ): Promise<object> {
    const newContact = { phone, name, email, address, github, created_by };
    return this.http.post('/api/contacts', newContact).toPromise();
  }

  searchContacts(input: string, userId: any): Promise<object> {
    return this.http.get(`/api/search/${input}/${userId}`).toPromise();
  }

  register(data) {
    return this.http.post('/api/register', data).toPromise();
  }
  login(data) {
    console.log('BACKEDN##$#$#$#', data);
    return this.http.post('/api/login', data).toPromise();
  }
  logout() {
    return this.http.get('/api/logout').toPromise();
  }
}
