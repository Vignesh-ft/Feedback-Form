import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

  /**
   * Manages the API call
   * @param api End point of the API
   * @param body Body to be send via API
   * @returns Response data from API
   */
  fetchData(api:any, body:any): Observable<any>  {
    return this.http.post<any>(`http://localhost:3500/${api}`, body)
  }
}
