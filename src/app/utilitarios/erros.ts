import { HttpErrorResponse } from '@angular/common/http';

export function extrairMensagens(e: HttpErrorResponse): string[] {
  if (e.status === 0) return ['Não foi possível conectar à API.'];
  if (e.status === 401) return ['Sessão expirada ou sem permissão. Faça login novamente.'];
  if (e.status === 404) return ['Registro não encontrado.'];

  const c: any = e.error;
  if (typeof c === 'string' && c) return [c];
  if (Array.isArray(c)) return c.map(String);

  if (c && typeof c === 'object') {
    if (c.errors && typeof c.errors === 'object') {
      return (Object.values(c.errors) as unknown[]).flat().map(String);
    }
    if (Array.isArray(c.mensagens)) return c.mensagens.map(String);
    if (Array.isArray(c.erros)) return c.erros.map(String);
    if (c.mensagem) return [String(c.mensagem)];
    if (c.message) return [String(c.message)];
    if (c.title) return [String(c.title)];
  }
  return ['Erro inesperado. Tente novamente.'];
}