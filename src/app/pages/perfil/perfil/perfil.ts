import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, RouterLink } from '@angular/router';
import { ArtistaService } from '../../../services/artista';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, RouterLink, Header, Sidebar],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil implements OnInit {
  private usuarioService = inject(UsuarioService);
  private artistaService = inject(ArtistaService);
  private router = inject(Router);

  usuario?: Usuario;
  artistaId?: string | number;
  mensagem = '';
  salvando = false;

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
  
  ngOnInit(): void {
    const usuarioSalvo = sessionStorage.getItem('usuarioLogado');

    if (!usuarioSalvo) {
      return;
    }

    this.usuario = JSON.parse(usuarioSalvo) as Usuario;

    if (!this.usuario.id) {
      this.mensagem = 'Nao foi possivel identificar o usuario desta sessao.';
      return;
    }

    this.usuarioService.getUsuarioById(this.usuario.id).subscribe({
      next: usuario => {
        this.usuario = usuario;
        this.artistaService.getArtistas().subscribe({
          next: artistas => {
            this.artistaId = artistas.find(
              artista => String(artista.user_id) === String(usuario.id)
            )?.id;
          },
          error: () => this.mensagem = 'Nao foi possivel verificar o perfil de artista.'
        });
      },
      error: () => this.mensagem = 'Nao foi possivel carregar os dados do perfil.'
    });
  }

  salvar(): void {
    if (!this.usuario || !this.usuario.id || this.salvando) {
      return;
    }

    this.salvando = true;
    this.mensagem = '';
    this.usuarioService.alterarUsuario(this.usuario).subscribe({
      next: usuario => {
        this.usuario = usuario;
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.mensagem = 'Perfil atualizado.';
        this.salvando = false;
      },
      error: () => {
        this.mensagem = 'Nao foi possivel atualizar o perfil.';
        this.salvando = false;
      }
    });
  }

  sair(): void {
    sessionStorage.removeItem('usuarioLogado');
    this.usuario = undefined;
    this.router.navigate(['/']);
  }
}
