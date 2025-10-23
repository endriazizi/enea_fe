import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens';


export type User = { id: string; email: string; name?: string; roles?: string[] };
export type LoginResponse = { token: string; user?: User };


const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';


@Injectable({ providedIn: 'root' })
export class AuthService {
private http = inject(HttpClient);
private base = inject(API_URL);


private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
private _user = signal<User | null>(parseUser(localStorage.getItem(USER_KEY)));


readonly token = this._token.asReadonly();
readonly user = this._user.asReadonly();
readonly isAuthenticated = computed(() => !!this._token());


/** Chiamato a bootstrap app per ripristinare la sessione */
async init(): Promise<void> {
if (!this._token()) return;
try {
if (!this._user()) {
const me = await this.http.get<User>(`${this.base}/auth/me`).toPromise();
this._user.set(me ?? null);
if (me) localStorage.setItem(USER_KEY, JSON.stringify(me));
}
} catch {
this.logout();
}
}


async login(email: string, password: string): Promise<User | null> {
const res = await this.http.post<LoginResponse>(`${this.base}/auth/login`, { email, password }).toPromise();
if (!res?.token) throw new Error('Token mancante');
this._token.set(res.token);
localStorage.setItem(TOKEN_KEY, res.token);


const me = res.user ?? await this.http.get<User>(`${this.base}/auth/me`).toPromise();
this._user.set(me ?? null);
if (me) localStorage.setItem(USER_KEY, JSON.stringify(me));
return me ?? null;
}


logout() {
this._token.set(null);
this._user.set(null);
localStorage.removeItem(TOKEN_KEY);
localStorage.removeItem(USER_KEY);
}
}


function parseUser(raw: string | null): User | null {
try { return raw ? (JSON.parse(raw) as User) : null; } catch { return null; }
}