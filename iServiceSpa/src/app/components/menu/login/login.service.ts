import { userDTO } from './../../../Models/DTO/userDTO';
import { authResult } from '../../../Models/DTO/authResult';
import { users } from './../../../Models/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  LoginUrl = 'https://localhost:7288/api/Authentication/';
  
constructor(private http: HttpClient) { }

postLogin(form: users): Observable<authResult> {
  return this.http.post<authResult>(`${this.LoginUrl}login`,form)
}

postNewUser(form: userDTO): Observable<authResult> {
  return this.http.post<authResult>(`${this.LoginUrl}register`,form)
}

getSearch(keyword: string): Observable<users[]> {
  return this.http.get<users[]>(`${this.LoginUrl}search/${keyword}`);
}

}
