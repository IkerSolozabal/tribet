import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerBetsComponent } from './winner-bets.component';

describe('WinnerBetsComponent', () => {
  let component: WinnerBetsComponent;
  let fixture: ComponentFixture<WinnerBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerBetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
