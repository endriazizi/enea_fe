import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from './tokens';


@Injectable({ providedIn: 'root' })
export class ApiService {
private http = inject(HttpClient);
private base = inject(API_URL);


get<T>(path: string, params?: Record<string, any>) {
const httpParams = new HttpParams({ fromObject: params ?? {} });
return this.http.get<T>(`${this.base}${path}`, { params: httpParams });
}


post<T>(path: string, body?: any) {
return this.http.post<T>(`${this.base}${path}`, body);
}


ping() {
return this.get<{ ok: boolean; time: string }>('/ping', { _ts: Date.now() });
}
}