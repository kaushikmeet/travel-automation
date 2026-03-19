import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryEditPageComponent } from './itinerary-edit-page.component';

describe('ItineraryEditPageComponent', () => {
  let component: ItineraryEditPageComponent;
  let fixture: ComponentFixture<ItineraryEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItineraryEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
