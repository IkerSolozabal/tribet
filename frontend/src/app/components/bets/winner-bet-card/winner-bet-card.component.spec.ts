import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerBetCardComponent } from './winner-bet-card.component';

describe('WinnerBetCardComponent', () => {
  let component: WinnerBetCardComponent;
  let fixture: ComponentFixture<WinnerBetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerBetCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerBetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
