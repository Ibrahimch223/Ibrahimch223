import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from './payment.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class Payment1Service {

  apiURL: string = 'http://localhost:8080/produits/api';
   constructor(private http : HttpClient) {}
  listePayment(): Observable<Payment[]>{
  return this.http.get<Payment[]>(this.apiURL)}

  ajouterPayment( prod: Payment):Observable<Payment>{
    return this.http.post<Payment>(this.apiURL, prod, httpOptions);
  }

  supprimerPayment(id : number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterPayment(id: number): Observable<Payment> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Payment>(url);
  }
  
  updatePayment(prod :Payment) : Observable<Payment>{
    return this.http.put<Payment>(this.apiURL, prod, httpOptions);
  }
  
    
}
