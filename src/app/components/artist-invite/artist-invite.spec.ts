import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistInvite } from './artist-invite';

describe('ArtistInvite', () => {
  let component: ArtistInvite;
  let fixture: ComponentFixture<ArtistInvite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistInvite],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistInvite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
