import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  @Input() authMode = false;

  get usuarioLogado(): { name: string } | null {
    const usuarioSalvo = sessionStorage.getItem('usuarioLogado');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  }

  get nomeExibido(): string {
    return this.usuarioLogado?.name || 'Entrar';
  }

  get inicialUsuario(): string {
    return this.usuarioLogado?.name?.charAt(0).toUpperCase() || '♙';
  }

  get linkUsuario(): string {
    return this.usuarioLogado ? '/perfil' : '/login';
  }
}
