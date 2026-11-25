import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacaoFormulario } from './publicacao-formulario';

describe('PublicacaoFormulario', () => {
  let component: PublicacaoFormulario;
  let fixture: ComponentFixture<PublicacaoFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacaoFormulario],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacaoFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
