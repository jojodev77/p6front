import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSituationComponent } from './account-situation.component';

describe('AccountSituationComponent', () => {
  let component: AccountSituationComponent;
  let fixture: ComponentFixture<AccountSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
