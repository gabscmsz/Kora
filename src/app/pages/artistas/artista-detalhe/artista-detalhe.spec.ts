import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistaDetalhe } from './artista-detalhe';

describe('ArtistaDetalhe', () => {
  let component: ArtistaDetalhe;
  let fixture: ComponentFixture<ArtistaDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistaDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistaDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
