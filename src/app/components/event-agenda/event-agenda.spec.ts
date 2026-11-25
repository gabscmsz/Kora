import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventAgenda } from './event-agenda';

describe('EventAgenda', () => {
  let component: EventAgenda;
  let fixture: ComponentFixture<EventAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAgenda],
    }).compileComponents();

    fixture = TestBed.createComponent(EventAgenda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
