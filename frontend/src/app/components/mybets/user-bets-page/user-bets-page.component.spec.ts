import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBetsPageComponent } from './user-bets-page.component';

describe('UserBetsPageComponent', () => {
  let component: UserBetsPageComponent;
  let fixture: ComponentFixture<UserBetsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBetsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
