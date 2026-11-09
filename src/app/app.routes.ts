import { Routes } from '@angular/router';
import { authGuard } from './guardas/auth-guard';
import { Login } from './paginas/login/login';
import { Inicio } from './paginas/inicio/inicio';
import { ProdutosLista } from './paginas/produtos-lista/produtos-lista';
import { ProdutoForm } from './paginas/produto-form/produto-form';
import { CategoriasProdutos } from './paginas/categorias-produtos/categorias-produtos';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Inicio, canActivate: [authGuard] },
  { path: 'produtos', component: ProdutosLista, canActivate: [authGuard] },
  { path: 'produtos/novo', component: ProdutoForm, canActivate: [authGuard] },
  { path: 'produtos/:id/editar', component: ProdutoForm, canActivate: [authGuard] },
  { path: 'categorias', component: CategoriasProdutos, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];