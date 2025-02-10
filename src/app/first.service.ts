import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirstService {

  constructor(private http: HttpClient) { }

  primero(): Observable<any> {
    return this.http.get<any>('../api/sesion.json');
  }
}
