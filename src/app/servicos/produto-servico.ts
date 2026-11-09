import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto } from '../../modelos/produto';
import { Relatorio } from '../../modelos/relatorio';


@Injectable({ providedIn: 'root' })
export class ProdutoServico {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/produtos`;

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

  obter(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }

  criar(produto: Partial<Produto>): Observable<Produto> {
    return this.http.post<Produto>(this.url, produto);
  }

  atualizar(id: number, produto: Partial<Produto>): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  relatorio(): Observable<Relatorio> {
    return this.http.get<Relatorio>(`${this.url}/relatorio`);
  }
}