import { servico } from '../../../Models/servico';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentTableService {
  rentTableUrl = 'https://localhost:7288/api/servico/';
  
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<servico[]> {
    return this.http.get<servico[]>(`${this.rentTableUrl}list`);
  }
  
  deleteRental(id: number): Observable<any> {
    return this.http.delete<any>(`${this.rentTableUrl}delete/${id}`);
  }

}
