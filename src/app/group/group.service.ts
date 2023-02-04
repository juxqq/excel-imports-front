import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../interfaces/group";

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/groups`);
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/groups/${id}`);
  }

  createGroup(file: any): Observable<Group>{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Group>(`${this.apiUrl}/groups`, formData);
  }

  updateGroup(group: Group, id: number): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/groups/${id}`, group);
  }

  deleteGroup(id: number): Observable<Group> {
    return this.http.delete<Group>(`${this.apiUrl}/groups/${id}`);
  }
}
