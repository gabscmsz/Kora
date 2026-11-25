import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  urlApi = 'http://localhost:3000/comentarios';
  private http = inject(HttpClient);

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.urlApi);
  }

  getComentarioById(id: string | number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.urlApi}/${id}`);
  }

  incluirComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.urlApi, comentario);
  }

  alterarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.urlApi}/${comentario.id}`, comentario);
  }

  excluirComentario(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
