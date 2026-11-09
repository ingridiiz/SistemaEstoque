import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ProdutoServico } from '../../servicos/produto-servico';
import { CategoriaServico } from '../../servicos/categoria-servico';
import { Produto } from '../../../modelos/produto';
import { Categoria } from '../../../modelos/categoria';
import { extrairMensagens } from '../../utilitarios/erros';

@Component({
  selector: 'app-produtos-lista',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './produtos-lista.html',
  styleUrl: './produtos-lista.css'
})
export class ProdutosLista implements OnInit {
  private produtoServico = inject(ProdutoServico);
  private categoriaServico = inject(CategoriaServico);

  produtos = signal<Produto[]>([]);
  categorias = signal<Categoria[]>([]);
  erros = signal<string[]>([]);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    forkJoin({
      produtos: this.produtoServico.listar(),
      categorias: this.categoriaServico.listar()
    }).subscribe({
      next: r => {
        this.produtos.set(r.produtos);
        this.categorias.set(r.categorias);
      },
      error: (e: HttpErrorResponse) => this.erros.set(extrairMensagens(e))
    });
  }

  nomeCategoria(id: number): string {
    return this.categorias().find(c => c.id === id)?.nome ?? '-';
  }

  excluir(produto: Produto): void {
    if (!confirm(`Excluir o produto "${produto.nome}"?`)) return;

    this.erros.set([]);
    this.produtoServico.excluir(produto.id).subscribe({
      next: () => this.carregar(),
      error: (e: HttpErrorResponse) => this.erros.set(extrairMensagens(e))
    });
  }
}