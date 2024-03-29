import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = environment.api.url;
  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(this.apiUrl + url);
  }
}
