import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ComentarioService } from './comentario';

describe('ComentarioService', () => {
  let service: ComentarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ComentarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
