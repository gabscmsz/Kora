import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  urlApi = 'http://localhost:3000/usuarios';
  private http = inject(HttpClient);

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlApi);
  }

  getUsuarioById(id: string | number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlApi}/${id}`);
  }

  incluirUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlApi, usuario);
  }

  alterarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlApi}/${usuario.id}`, usuario);
  }

  excluirUsuario(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }
}
