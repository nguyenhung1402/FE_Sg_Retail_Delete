import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  path = 'assets/mock/menu.json';
  constructor(private httpClient: HttpClient) { }
  fetchMenuItems() {
    return this.httpClient.get(this.path);
  }
}