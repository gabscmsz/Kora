import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [CommonModule, FormsModule, NgSelectModule, RouterLink, Header],
  selector: 'app-cadastro',
  styleUrl: './cadastro.css',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  usuario: Usuario = {
    username: '',
    name: '',
    email: '',
    password: '',
    city: '',
    state: '',
    fav_genres: [],
    artists_liked: []
  };

  confirmarSenha = '';
  mensagem = '';
  generosDisponiveis = [
    'MPB',
    'Rock',
    'Pop',
    'Samba',
    'Sertanejo',
    'Funk',
    'Rap',
    'Jazz',
    'Blues',
    'Eletronica'
  ];

    estados = [
      "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"
    ]
  cadastrar(): void {
    this.mensagem = '';

    if (this.usuario.password !== this.confirmarSenha) {
      this.mensagem = 'As senhas nao coincidem.';
      return;
    }

    this.usuarioService.incluirUsuario(this.usuario).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.mensagem = 'Nao foi possivel cadastrar o usuario.'
    });
  }
}
