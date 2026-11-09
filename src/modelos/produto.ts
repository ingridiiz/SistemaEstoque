import { Categoria } from './categoria';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  categoriaId: number;
  categoria?: Categoria;
}