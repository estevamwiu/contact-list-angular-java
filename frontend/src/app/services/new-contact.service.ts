import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../forms/contact.model';

@Injectable({
  providedIn: 'root'
})
export class NewContactService {

  private baseUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient) {}

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, contact);
  }

  update(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.baseUrl}/${id}`, contact);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl);
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
