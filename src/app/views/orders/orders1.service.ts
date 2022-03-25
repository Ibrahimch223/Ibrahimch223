import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orders } from './orders.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class Orders1Service {

  apiURL: string = 'http://localhost:8080/produits/api';
   constructor(private http : HttpClient) {}
  listeOrders(): Observable<Orders[]>{
  return this.http.get<Orders[]>(this.apiURL)}

  ajouterOrders( prod: Orders):Observable<Orders>{
    return this.http.post<Orders>(this.apiURL, prod, httpOptions);
  }

  supprimerOrders(id : number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterOrders(id: number): Observable<Orders> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Orders>(url);
  }
  
  updateOrders(prod :Orders) : Observable<Orders>{
    return this.http.put<Orders>(this.apiURL, prod, httpOptions);
  }
  
    
}
