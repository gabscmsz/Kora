
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  get cidadeUsuario(): string {
    const usuarioSalvo = sessionStorage.getItem('usuarioLogado');
    if (!usuarioSalvo) {
      return 'Belo Horizonte, MG';
    }

    const usuario = JSON.parse(usuarioSalvo);
    return [usuario.city, usuario.state].filter(Boolean).join(', ') || 'Adicione sua cidade';
  }
}
