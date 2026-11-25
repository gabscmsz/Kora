import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Header],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  email = '';
  password = '';
  mensagem = '';
  entrando = false;

  entrar(): void {
    if (this.entrando) {
      return;
    }

    this.entrando = true;
    this.mensagem = '';
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        const usuario = usuarios.find(item =>
          item.email.toLowerCase() === this.email.trim().toLowerCase()
          && item.password === this.password
        );

        if (!usuario) {
          this.mensagem = 'E-mail ou senha invalidos.';
          this.entrando = false;
          return;
        }

        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.router.navigate(['/perfil']);
      },
      error: () => {
        this.mensagem = 'Nao foi possivel realizar o login.';
        this.entrando = false;
      }
    });
  }
}
