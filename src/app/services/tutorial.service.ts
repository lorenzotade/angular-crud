import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tutorial} from "../models/tutorial.model";

const endpoint = 'http://localhost:3000/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(endpoint);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${endpoint}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(endpoint, data);
  }

  update(id: any, data:any): Observable<any> {
    return this.http.put(`${endpoint}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${endpoint}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(endpoint);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${endpoint}?title=${title}`);
  }

}
