import { Token } from '@angular/compiler';
import { RentalDTO } from '../../../Models/DTO/rentalDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { prestador } from '../../../Models/prestador';


@Injectable({
  providedIn: 'root'
})
export class NewRentalService {
  rentTableUrl = 'https://localhost:7288/api/Servico/';
  prestadorTableUrl = 'https://localhost:7288/api/prestador/';
  
  constructor(private http: HttpClient) { }
  
  postRent(element: RentalDTO, token: string): Observable<any> {
    return this.http.post<any>(`${this.rentTableUrl}servico`,element)
  }
  
  getPrestador(): Observable<prestador[]> {
    return this.http.get<prestador[]>(`${this.prestadorTableUrl}list`);
  }

  // getAvailability(id: any): Observable<any> {
  //   return this.http.get<any>(`${this.movieTableUrl}availability/${id}`);
  // }

}

