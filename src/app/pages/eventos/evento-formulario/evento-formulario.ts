import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../../components/header/header';
import { Evento } from '../../../models/evento.model';
import { EventoService } from '../../../services/evento.service';

@Component({
  imports: [CommonModule, FormsModule, NgSelectModule, RouterLink, Header],
  selector: 'app-evento-formulario',
  styleUrl: './evento-formulario.css',
  templateUrl: './evento-formulario.html',
})

export class EventoFormulario {
  private eventoService = inject(EventoService);
  private router = inject(Router);

  mensagem = ''

  evento: Evento = {
    owner_id: '',
    artist_ids: [],
    name: '',
    description: '',
    cover: '',
    genres: [],
    city: '',
    state: ' ',
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
      "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"
    ]

  cadastrarEvento() : void {
    this.mensagem = '';

    this.eventoService.incluirUsuario(this.evento).subscribe({
      next: () => this.router.navigate(['/eventos']),
      error: () => this.mensagem = 'Nao foi possivel cadastrar o usuario.'
    }
  }
}
