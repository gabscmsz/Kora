import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AutenticacaoService } from './autenticacao';

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AutenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
