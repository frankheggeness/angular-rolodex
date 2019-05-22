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

  createMovie(title: string, year: number): Promise<object> {
    const newMovie = { title, year };
    return this.http.post('/api/movies', newMovie).toPromise();
  }
}
