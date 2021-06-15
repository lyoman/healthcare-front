import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*',
      // 'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('token')

    })
  };

  httpPutOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')

    })
  };

  readonly BaseURI = 'https://guardianangel.pythonanywhere.com/api';
  // readonly portBaseUrl = 'https://guardianangel.pythonanywhere.com/api';
  readonly portBaseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  readonly testUrl = 'https://guardianangel.pythonanywhere.com/api';


  public GetData(endPoint: string): Observable<any> {
    console.log('whats happening', this.portBaseUrl + endPoint);
    return this.http.get(this.portBaseUrl + endPoint, this.httpOptions);
  }

  public DeleteData(endPoint: string): Observable<any> {
    console.log('whats happening', this.portBaseUrl + endPoint);
    return this.http.delete(this.portBaseUrl + endPoint, this.httpOptions);
  }

  public PostData(url: string, formData: any): Observable<any> {
    return this.http.post(this.portBaseUrl + url, formData, this.httpPutOptions);
  }

  public PutData(url: string, formData: any): Observable<any> {
    return this.http.put(this.portBaseUrl + url, formData, this.httpPutOptions);
  }
  // public GetData(endPoint: string): Observable<any> {
  //   return this.http.get(this.portBaseUrl + endPoint, this.httpOptions);
  // }

}
