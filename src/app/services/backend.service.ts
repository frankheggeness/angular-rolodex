import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getUserContacts(): Promise<object> {
    return this.http.get('/api/contacts?user=1').toPromise();
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

  searchContacts(input: string): Promise<object> {
    return this.http.get(`/api/search/${input}`).toPromise();
  }
}
