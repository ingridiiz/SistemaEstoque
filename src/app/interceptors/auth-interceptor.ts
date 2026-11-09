import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Autenticacao } from '../servicos/autenticacao';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const autenticacao = inject(Autenticacao);
  const router = inject(Router);
  const token = autenticacao.obterToken();

  const requisicao = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(requisicao).pipe(
    catchError((erro: HttpErrorResponse) => {
      const ehLogin = req.url.endsWith('/auth/login');
      if (erro.status === 401 && !ehLogin) {
        autenticacao.sair();
        router.navigate(['/login']);
      }
      return throwError(() => erro);
    })
  );
};