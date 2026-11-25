import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Evento } from '../../../models/evento.model';
import { Usuario } from '../../../models/usuario.model';
import { EventoService } from '../../../services/evento';
import { ArtistaService } from '../../../services/artista';
import { UsuarioService } from '../../../services/usuario.service';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { forkJoin } from 'rxjs';

interface OpcaoArtista {
  id: string;
  nome: string;
  usuario: string;
}

@Component({
  imports: [CommonModule, FormsModule, NgSelectModule, Header, Sidebar],
  selector: 'app-evento-formulario',
  styleUrl: './evento-formulario.css',
  templateUrl: './evento-formulario.html',
})

export class EventoFormulario implements OnInit {
  private eventoService = inject(EventoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private artistaService = inject(ArtistaService);
  private usuarioService = inject(UsuarioService);

  mensagem = ''
  artistasDisponiveis: OpcaoArtista[] = [];
  preco: number | null = null;

  evento: Evento = {
    owner_id: '',
    artist_ids: [],
    name: '',
    description: '',
    cover: '',
    genres: [],
    city: '',
    state: '',
    date: '',
    time: '',
    venue: '',
    address: '',
    price: 0,
    ticket_link: '',
  }

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
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO"
  ]

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    forkJoin({
      artistas: this.artistaService.getArtistas(),
      usuarios: this.usuarioService.getUsuarios()
    }).subscribe({
      next: ({ artistas, usuarios }) => {
        this.artistasDisponiveis = artistas.map(artista => {
          const usuario = usuarios.find(item => String(item.id) === String(artista.user_id));
          return {
            id: String(artista.id ?? ''),
            nome: artista.stage_name,
            usuario: this.formatarUsuario(usuario?.username)
          };
        }).filter(artista => artista.id);
      },
      error: () => this.mensagem = 'Nao foi possivel carregar os artistas.'
    });

    if (!id) {
      const usuarioSalvo = sessionStorage.getItem('usuarioLogado');

      if (usuarioSalvo) {
        const usuario: Usuario = JSON.parse(usuarioSalvo);
        this.evento.owner_id = usuario.id ?? '';
      }
      return;
    }

    this.eventoService.getEventoById(id).subscribe({
      next: evento => {
        this.evento = evento;
        this.preco = evento.price ?? null;
        this.evento.artist_ids = Array.isArray(evento.artist_ids)
          ? evento.artist_ids.map(String)
          : [];
      },
      error: () => this.mensagem = 'Nao foi possivel carregar o evento.'
    });
  }

  private formatarUsuario(username?: string): string {
    if (!username) {
      return 'Conta não vinculada';
    }
    const usuario = username.trim().replace(/^@/, '');
    return usuario ? `@${usuario}` : 'Conta não vinculada';
  }

  buscarArtista = (artista: OpcaoArtista, termo: string): boolean => {
    const busca = termo.toLowerCase().replace(/^@/, '');
    return `${artista.nome} ${artista.usuario}`
      .toLowerCase()
      .replace(/^@/, '')
      .includes(busca);
  };

  criarArtistaSemConta = (nome: string): OpcaoArtista => ({
    id: nome.trim(),
    nome: nome.trim(),
    usuario: ''
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.evento.cover = input.files[0].name;
    }
  }

  salvar(): void {
    if (this.preco === null) {
      return;
    }

    this.evento.price = this.preco;

    if (this.evento.id) {
      this.eventoService.alterarEvento(this.evento).subscribe({
        next: () => this.router.navigate(['/eventos']),
        error: () => this.mensagem = 'Nao foi possivel alterar o evento.'
      });
      return;
    }

    this.cadastrarEvento();
  }

  excluir(): void {
    if (!this.evento.id) {
      return;
    }

    if (!window.confirm('Deseja realmente excluir este evento?')) {
      return;
    }

    this.eventoService.excluirEvento(this.evento.id).subscribe({
      next: () => this.router.navigate(['/eventos']),
      error: () => this.mensagem = 'Nao foi possivel excluir o evento.'
    });
  }

  cadastrarEvento(): void {
    this.mensagem = '';

    this.eventoService.incluirEvento(this.evento).subscribe({
      next: () => this.router.navigate(['/eventos']),
      error: () => this.mensagem = 'Nao foi possivel cadastrar o evento.'
    });
  }
}
