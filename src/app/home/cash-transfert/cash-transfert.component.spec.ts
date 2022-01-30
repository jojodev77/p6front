import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransfertComponent } from './cash-transfert.component';

describe('CashTransfertComponent', () => {
  let component: CashTransfertComponent;
  let fixture: ComponentFixture<CashTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
