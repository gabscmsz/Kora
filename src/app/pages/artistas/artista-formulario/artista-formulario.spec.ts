import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ArtistaFormulario } from './artista-formulario';
import { ArtistaService } from '../../../services/artista';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ArtistaFormulario', () => {
  let component: ArtistaFormulario;
  let fixture: ComponentFixture<ArtistaFormulario>;

  beforeEach(async () => {
    sessionStorage.removeItem('usuarioLogado');

    await TestBed.configureTestingModule({
      imports: [ArtistaFormulario],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistaFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('associa o artista ao usuario logado ao cadastrar', () => {
    sessionStorage.setItem('usuarioLogado', JSON.stringify({ id: '42' }));
    const artistaService = TestBed.inject(ArtistaService);
    const usuarioService = TestBed.inject(UsuarioService);
    const router = TestBed.inject(Router);
    component.confirmarSenha = 'senha-correta';
    spyOn(usuarioService, 'getUsuarioById').and.returnValue(of({
      id: '42',
      username: 'artista',
      name: 'Artista',
      email: 'artista@example.com',
      password: 'senha-correta',
      city: '',
      state: '',
      fav_genres: [],
      artists_liked: []
    }));
    spyOn(artistaService, 'incluirArtista').and.returnValue(of(component.artista));
    spyOn(router, 'navigate');

    component.salvar();

    expect(artistaService.incluirArtista).toHaveBeenCalledWith(
      jasmine.objectContaining({ user_id: '42' })
    );
  });

  it('nao cadastra o artista quando a senha de confirmacao nao corresponde', () => {
    sessionStorage.setItem('usuarioLogado', JSON.stringify({ id: '42' }));
    const artistaService = TestBed.inject(ArtistaService);
    const usuarioService = TestBed.inject(UsuarioService);
    component.confirmarSenha = 'senha-errada';
    spyOn(usuarioService, 'getUsuarioById').and.returnValue(of({
      id: '42',
      username: 'artista',
      name: 'Artista',
      email: 'artista@example.com',
      password: 'senha-correta',
      city: '',
      state: '',
      fav_genres: [],
      artists_liked: []
    }));
    spyOn(artistaService, 'incluirArtista').and.returnValue(of(component.artista));

    component.salvar();

    expect(artistaService.incluirArtista).not.toHaveBeenCalled();
    expect(component.mensagem).toBe('A senha informada nao confere.');
  });
});
