import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Autenticacao } from '../../servicos/autenticacao';
import { ProdutoServico } from '../../servicos/produto-servico';
import { Relatorio } from '../../../modelos/relatorio';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  private produtos = inject(ProdutoServico);
  private autenticacao = inject(Autenticacao);
  private router = inject(Router);

  relatorio = signal<Relatorio | null>(null);
  erro = signal('');

  ngOnInit(): void {
    this.produtos.relatorio().subscribe({
      next: r => this.relatorio.set(r),
      error: () => this.erro.set('Não foi possível carregar o relatório.')
    });
  }

  sair(): void {
    this.autenticacao.sair();
    this.router.navigate(['/login']);
  }
}