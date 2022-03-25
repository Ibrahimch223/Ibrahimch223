import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlaningService {
  readonly APIUrl = "http://localhost:53535/api";

  constructor(private http: HttpClient) { }

  /**api */
  getplaningList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/planing');
  }

  addplaning(val: any) {
    return this.http.post(this.APIUrl + '/planing', val);
  }

  updateplaning(val: any) {
    return this.http.put(this.APIUrl + '/planing', val);
  }

  deleteplaning(val: any) {
    return this.http.delete(this.APIUrl + '/planing/' + val);
  }

  getAllcategory(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/category/GetAllcategory');
  }

}
