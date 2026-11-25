import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from '../../../models/artista.model';
import { Usuario } from '../../../models/usuario.model';
import { ArtistaService } from '../../../services/artista';

@Component({
  imports: [CommonModule, FormsModule, NgSelectModule],
  selector: 'app-artista-formulario',
  styleUrl: './artista-formulario.css',
  templateUrl: './artista-formulario.html',
})
export class ArtistaFormulario implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private artistaService = inject(ArtistaService);

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
  generos: string[] = [];
  spotifyUsuario = '';
  instagramUsuario = '';
  mensagem = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      const usuarioSalvo = sessionStorage.getItem('usuarioLogado');

      if (usuarioSalvo) {
        const usuario: Usuario = JSON.parse(usuarioSalvo);
        this.artista.user_id = usuario.id ?? '';
      }
      return;
    }

    if (id) {
      this.artistaService.getArtistaById(id).subscribe({
        next: artista => {
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
        },
        error: () => this.mensagem = 'Nao foi possivel carregar o artista.'
      });
    }
  }

  salvar(): void {
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

    this.artistaService.incluirArtista(this.artista).subscribe({
      next: () => this.router.navigate(['/artistas']),
      error: () => this.mensagem = 'Nao foi possivel cadastrar o artista.'
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
      next: () => this.router.navigate(['/artistas']),
      error: () => this.mensagem = 'Nao foi possivel excluir o artista.'
    });
  }
}
