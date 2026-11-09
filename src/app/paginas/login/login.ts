import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Autenticacao } from '../../servicos/autenticacao';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private autenticacao = inject(Autenticacao);
  private router = inject(Router);

  login = '';
  senha = '';
  erro = signal('');
  carregando = signal(false);

  entrar(): void {
    this.erro.set('');
    this.carregando.set(true);

    this.autenticacao.entrar({ login: this.login, senha: this.senha }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e: HttpErrorResponse) => {
        this.carregando.set(false);
        if (e.status === 0) {
          this.erro.set('Não foi possível conectar à API.');
        } else if (e.status === 401) {
          this.erro.set('Login ou senha inválidos.');
        } else {
          this.erro.set(typeof e.error === 'string' ? e.error : 'Erro ao entrar.');
        }
      }
    });
  }
}