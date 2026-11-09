import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../../modelos/login';

@Injectable({ providedIn: 'root' })
export class Autenticacao {
  private http = inject(HttpClient);
  private readonly chaveToken = 'token';

  entrar(dados: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, dados)
      .pipe(tap(resposta => localStorage.setItem(this.chaveToken, resposta.token)));
  }

  sair(): void {
    localStorage.removeItem(this.chaveToken);
  }

  obterToken(): string | null {
    return localStorage.getItem(this.chaveToken);
  }

  estaLogado(): boolean {
    const token = this.obterToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}