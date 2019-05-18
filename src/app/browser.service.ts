import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor() { }

  setSession(key: string, value: any): void {
    const data = value === undefined ? "" : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  getSession(key: string): any {
    const data = window.sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
}
