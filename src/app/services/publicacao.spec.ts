import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PublicacaoService } from './publicacao';

describe('PublicacaoService', () => {
  let service: PublicacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(PublicacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
