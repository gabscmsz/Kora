import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ArtistaFormulario } from './artista-formulario';

describe('ArtistaFormulario', () => {
  let component: ArtistaFormulario;
  let fixture: ComponentFixture<ArtistaFormulario>;

  beforeEach(async () => {
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
});
