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
  selector: 'app-categorias-produtos',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './categorias-produtos.html',
  styleUrl: './categorias-produtos.css'
})
export class CategoriasProdutos implements OnInit {
  private produtoServico = inject(ProdutoServico);
  private categoriaServico = inject(CategoriaServico);

  categorias = signal<Categoria[]>([]);
  produtos = signal<Produto[]>([]);
  erros = signal<string[]>([]);

  ngOnInit(): void {
    forkJoin({
      categorias: this.categoriaServico.listar(),
      produtos: this.produtoServico.listar()
    }).subscribe({
      next: r => {
        this.categorias.set(r.categorias);
        this.produtos.set(r.produtos);
      },
      error: (e: HttpErrorResponse) => this.erros.set(extrairMensagens(e))
    });
  }

  produtosDa(categoriaId: number): Produto[] {
    return this.produtos().filter(p => p.categoriaId === categoriaId);
  }
}