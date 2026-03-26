import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsCardComponent } from './destinations-card.component';

describe('DestinationsCardComponent', () => {
  let component: DestinationsCardComponent;
  let fixture: ComponentFixture<DestinationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
