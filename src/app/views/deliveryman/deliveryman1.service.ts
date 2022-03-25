import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Deliveryman } from './deliveryman.model';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class Deliveryman1Service {

  apiURL: string = 'http://localhost:8080/produits/api';
   constructor(private http : HttpClient) {}
  listeDeliveryman(): Observable<Deliveryman[]>{
  return this.http.get<Deliveryman[]>(this.apiURL)}

  ajouterDeliveryman( prod: Deliveryman):Observable<Deliveryman>{
    return this.http.post<Deliveryman>(this.apiURL, prod, httpOptions);
  }

  supprimerDeliveryman(id : number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterDeliveryman(id: number): Observable<Deliveryman> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Deliveryman>(url);
  }
  
  updateDeliveryman(prod :Deliveryman) : Observable<Deliveryman>{
    return this.http.put<Deliveryman>(this.apiURL, prod, httpOptions);
  }
  
    
}
