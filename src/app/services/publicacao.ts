import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacao } from '../models/publicacao.model';

@Injectable({ providedIn: 'root' })
export class PublicacaoService {
  urlApi = 'http://localhost:3000/publicacoes';
  private http = inject(HttpClient);

  getPublicacoes(): Observable<Publicacao[]> {
    return this.http.get<Publicacao[]>(this.urlApi);
  }

  getPublicacaoById(id: string | number): Observable<Publicacao> {
    return this.http.get<Publicacao>(`${this.urlApi}/${id}`);
  }

  incluirPublicacao(publicacao: Publicacao): Observable<Publicacao> {
    return this.http.post<Publicacao>(this.urlApi, publicacao);
  }

  alterarPublicacao(publicacao: Publicacao): Observable<Publicacao> {
    return this.http.put<Publicacao>(`${this.urlApi}/${publicacao.id}`, publicacao);
  }

  excluirPublicacao(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
