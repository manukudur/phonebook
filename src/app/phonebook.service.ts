import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PhonebookService {
  url: string = "http://localhost:3000/api";
  reloadBlogs = new Subject();
  constructor(private http: HttpClient) {}

  getItems(): Observable<[]> {
    return this.http.get<[]>(this.url);
  }
  getContacts(): Observable<[]> {
    return this.http.get<[]>(this.url + "/contacts");
  }
  getGroup(id): Observable<any> {
    return this.http.get<any>(this.url + `/group/${id}`);
  }
  postContact(data): Observable<any> {
    return this.http.post<any>(`${this.url}/create/contact`, data);
  }
  postGroup(data): Observable<any> {
    return this.http.post<any>(`${this.url}/create/group`, data);
  }
  patchContact(data): Observable<any> {
    return this.http.patch<any>(`${this.url}/contact/${data._id}`, data);
  }
  patchGroup(data): Observable<any> {
    return this.http.patch<any>(`${this.url}/group/${data._id}`, data);
  }
  deleteContact(id): Observable<any> {
    return this.http.delete<any>(`${this.url}/contact/${id}`);
  }
  deleteGroup(id): Observable<any> {
    return this.http.delete<any>(`${this.url}/group/${id}`);
  }
}
