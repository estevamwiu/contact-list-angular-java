
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../forms/contact.model';

@Injectable({
  providedIn: 'root'
})
export class NewContactService {

  private apiUrl = 'http://localhost:8080/contacts';
 
  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }
  
  getContactById(id: number): Observable<Contact> {
  return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id: number, contact: Contact): Observable<Contact> {
  return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
}

}
