import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = environment.api.url;
  private cache: { [url: string]: { response: any; expiry: number } } = {};

  constructor(private http: HttpClient) {}

  getWithCache(url: string): Observable<any> {
    const cachedData = this.cache[url];
    if (cachedData && cachedData.expiry > Date.now()) {
      return of(cachedData.response);
    } else {
      return this.http.get(this.apiUrl + url).pipe(
        tap((response) => {
          // Cache the response with a TTL of 5 minutes (300000 milliseconds)
          this.cache[url] = { response, expiry: Date.now() + 300000 };
        })
      );
    }
  }
}
