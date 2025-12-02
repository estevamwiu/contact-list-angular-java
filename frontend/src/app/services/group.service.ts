import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../forms/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) {}

  create(group: Group): Observable<Group> {
    return this.http.post<Group>(this.baseUrl, group);
  }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  getById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }

  update(id: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.baseUrl}/${id}`, group);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
