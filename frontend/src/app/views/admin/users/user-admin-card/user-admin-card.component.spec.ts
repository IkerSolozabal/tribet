import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminCardComponent } from './user-admin-card.component';

describe('UserAdminCardComponent', () => {
  let component: UserAdminCardComponent;
  let fixture: ComponentFixture<UserAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdminCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
