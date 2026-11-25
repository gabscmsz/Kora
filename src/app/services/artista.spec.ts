import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ArtistaService } from './artista';

describe('ArtistaService', () => {
  let service: ArtistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ArtistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
