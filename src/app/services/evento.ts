import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({ providedIn: 'root' })
export class EventoService {
  urlApi = 'http://localhost:3000/eventos';
  private http = inject(HttpClient);

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.urlApi);
  }

  getEventoById(id: string | number): Observable<Evento> {
    return this.http.get<Evento>(`${this.urlApi}/${id}`);
  }

  incluirEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.urlApi, evento);
  }

  alterarEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.urlApi}/${evento.id}`, evento);
  }

  excluirEvento(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
