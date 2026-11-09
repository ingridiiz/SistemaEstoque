import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProdutoServico } from '../../servicos/produto-servico';
import { CategoriaServico } from '../../servicos/categoria-servico';
import { Categoria } from '../../../modelos/categoria';
import { extrairMensagens } from '../../utilitarios/erros';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produto-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm implements OnInit {
  private produtoServico = inject(ProdutoServico);
  private categoriaServico = inject(CategoriaServico);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  nome = '';
  preco: number | null = null;
  quantidade: number | null = null;
  categoriaId: number | null = null;

  categorias = signal<Categoria[]>([]);
  erros = signal<string[]>([]);
  salvando = signal(false);

  get editando(): boolean {
    return this.id !== null;
  }

  ngOnInit(): void {
    this.categoriaServico.listar().subscribe({
      next: c => this.categorias.set(c),
      error: (e: HttpErrorResponse) => this.erros.set(extrairMensagens(e))
    });

    const idRota = this.route.snapshot.paramMap.get('id');
    if (idRota) {
      this.id = Number(idRota);
      this.produtoServico.obter(this.id).subscribe({
        next: p => {
          this.nome = p.nome;
          this.preco = p.preco;
          this.quantidade = p.quantidade;
          this.categoriaId = p.categoriaId;
        },
        error: (e: HttpErrorResponse) => this.erros.set(extrairMensagens(e))
      });
    }
  }

  salvar(form: NgForm): void {
    this.erros.set([]);
    if (this.salvando()) return;

    const nome = this.nome.trim();
    const preco = this.preco;
    const quantidade = this.quantidade;
    const categoriaId = this.categoriaId;

    if (
      form.invalid ||
      !nome ||
      preco === null ||
      !Number.isFinite(preco) ||
      preco < 0 ||
      quantidade === null ||
      !Number.isInteger(quantidade) ||
      quantidade < 0 ||
      categoriaId === null
    ) {
      form.form.markAllAsTouched();
      this.erros.set(['Preencha corretamente todos os campos obrigatórios.']);
      return;
    }

    this.salvando.set(true);

    const dados = {
      nome,
      preco,
      quantidade,
      categoriaId
    };

    const requisicao: Observable<unknown> = this.id === null
  ? this.produtoServico.criar(dados)
  : this.produtoServico.atualizar(this.id, dados);
  
    requisicao.subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: (e: HttpErrorResponse) => {
        this.salvando.set(false);
        this.erros.set(extrairMensagens(e));
      }
    });
  }
}
