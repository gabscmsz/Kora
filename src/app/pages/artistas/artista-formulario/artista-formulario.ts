import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Artista } from '../../../models/artista.model';
import { Usuario } from '../../../models/usuario.model';
import { ArtistaService } from '../../../services/artista';
import { UsuarioService } from '../../../services/usuario.service';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';

@Component({
  imports: [CommonModule, FormsModule, NgSelectModule, RouterLink, Header, Sidebar],
  selector: 'app-artista-formulario',
  styleUrl: './artista-formulario.css',
  templateUrl: './artista-formulario.html',
})
export class ArtistaFormulario implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private artistaService = inject(ArtistaService);
  private usuarioService = inject(UsuarioService);

  artista: Artista = {
    user_id: '',
    stage_name: '',
    bio: '',
    photo: '',
    city: '',
    state: '',
    genres: [],
    spotify: '',
    instagram: '',
    likes: 0
  };

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
    
  generos: string[] = [];
  spotifyUsuario = '';
  instagramUsuario = '';
  confirmarSenha = '';
  mensagem = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      const usuarioSalvo = sessionStorage.getItem('usuarioLogado');

      if (usuarioSalvo) {
        const usuario: Usuario = JSON.parse(usuarioSalvo);
        if (!usuario.id) {
          this.mensagem = 'Nao foi possivel identificar o usuario desta sessao.';
          return;
        }

        this.artista.user_id = usuario.id;
        this.artistaService.getArtistas().subscribe({
          next: artistas => {
            const artistaExistente = artistas.find(
              artista => String(artista.user_id) === String(usuario.id)
            );

            if (!artistaExistente) {
              return;
            }

            if (!artistaExistente.id) {
              this.mensagem = 'Nao foi possivel identificar o perfil de artista.';
              return;
            }

            this.carregarArtista(artistaExistente);
            this.router.navigate(
              ['/artistas', artistaExistente.id, 'editar'],
              { replaceUrl: true }
            );
          },
          error: () => this.mensagem = 'Nao foi possivel verificar seu perfil de artista.'
        });
      }
      return;
    }

    if (id) {
      this.artistaService.getArtistaById(id).subscribe({
        next: artista => this.carregarArtista(artista),
        error: () => this.mensagem = 'Quer ser artista? Complete o cadastro e envie seu perfil para aprovação.'
      });
    }
  }

  private carregarArtista(artista: Artista): void {
    this.artista = artista;
    this.generos = Array.isArray(artista.genres)
      ? artista.genres
      : [];
    this.spotifyUsuario = this.removerPrefixo(
      artista.spotify,
      'https://open.spotify.com/artist/'
    );
    this.instagramUsuario = this.removerPrefixo(
      artista.instagram,
      'https://instagram.com/'
    );
  }

  salvar(): void {
    this.mensagem = '';
    this.artista.genres = this.generos;
    this.artista.spotify = this.spotifyUsuario
      ? `https://open.spotify.com/artist/${this.spotifyUsuario.replace(/^https:\/\/open\.spotify\.com\/artist\//, '')}`
      : '';
    this.artista.instagram = this.instagramUsuario
      ? `https://instagram.com/${this.instagramUsuario.replace(/^@/, '').replace(/^https:\/\/instagram\.com\//, '')}`
      : '';

    if (this.artista.id) {
      this.artistaService.alterarArtista(this.artista).subscribe({
        next: () => this.router.navigate(['/artistas']),
        error: () => this.mensagem = 'Nao foi possivel alterar o artista.'
      });
      return;
    }

    const usuarioSalvo = sessionStorage.getItem('usuarioLogado');
    if (!usuarioSalvo) {
      this.mensagem = 'Entre na sua conta para criar um perfil de artista.';
      return;
    }

    const usuario: Usuario = JSON.parse(usuarioSalvo);
    if (!usuario.id) {
      this.mensagem = 'Nao foi possivel identificar o usuario desta sessao.';
      return;
    }
    const userId = usuario.id;

    if (!this.confirmarSenha) {
      this.mensagem = 'Confirme sua senha para criar o perfil de artista.';
      return;
    }

    this.usuarioService.getUsuarioById(userId).subscribe({
      next: usuarioAtual => {
        if (usuarioAtual.password !== this.confirmarSenha) {
          this.mensagem = 'A senha informada nao confere.';
          return;
        }

        this.artista.user_id = usuarioAtual.id ?? userId;
        this.artistaService.incluirArtista(this.artista).subscribe({
          next: () => this.router.navigate(['/artistas']),
          error: () => this.mensagem = 'Nao foi possivel cadastrar o artista.'
        });
      },
      error: () => this.mensagem = 'Nao foi possivel confirmar sua senha.'
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.artista.photo = input.files[0].name;
    }
  }

  private removerPrefixo(valor: string, prefixo: string): string {
    if (!valor) {
      return '';
    }
    return valor.startsWith(prefixo) ? valor.slice(prefixo.length) : valor;
  }

  excluir(): void {
    if (!this.artista.id) {
      return;
    }

    if (!window.confirm('Deseja realmente excluir este artista?')) {
      return;
    }

    this.artistaService.excluirArtista(this.artista.id).subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: () => this.mensagem = 'Perfil não cadastrado como artista.'
    });
  }
}
