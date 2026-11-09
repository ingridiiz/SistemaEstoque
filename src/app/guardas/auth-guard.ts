import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Autenticacao } from '../servicos/autenticacao';

export const authGuard: CanActivateFn = () => {
  const autenticacao = inject(Autenticacao);
  const router = inject(Router);

  return autenticacao.estaLogado() ? true : router.createUrlTree(['/login']);
};