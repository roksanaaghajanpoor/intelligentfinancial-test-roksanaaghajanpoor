import { LoginResponse } from './dto/login.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { BrowserService } from '../browser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://api.tsetab.com/api';
  constructor(
    private http: HttpClient,
    private browserService: BrowserService) { }

  private buildApiUrl(url: string) {
    return this.baseUrl + url;
  }

  login(request): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.buildApiUrl('/Users/Authenticate'),
      request, { headers: headers })
      .pipe(
        map((response: LoginResponse) => {
          this.browserService.setSession('userToken', response)
          return response;
        })
      );
  }

  signup(request): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(this.buildApiUrl('/Users/Register'),
      request, { headers: headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getBooksList(): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + this.browserService.getSession('userToken').token
    })
    return this.http.get(this.buildApiUrl('/books/EmployeeList'), { headers: headers });
  }
}

