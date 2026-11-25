import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artista } from '../models/artista.model';

@Injectable({ providedIn: 'root' })
export class ArtistaService {
  urlApi = 'http://localhost:3000/artistas';
  private http = inject(HttpClient);

  getArtistas(): Observable<Artista[]> {
    return this.http.get<Artista[]>(this.urlApi);
  }

  getArtistaById(id: string | number): Observable<Artista> {
    return this.http.get<Artista>(`${this.urlApi}/${id}`);
  }

  incluirArtista(artista: Artista): Observable<Artista> {
    return this.http.post<Artista>(this.urlApi, artista);
  }

  alterarArtista(artista: Artista): Observable<Artista> {
    return this.http.put<Artista>(`${this.urlApi}/${artista.id}`, artista);
  }

  excluirArtista(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
