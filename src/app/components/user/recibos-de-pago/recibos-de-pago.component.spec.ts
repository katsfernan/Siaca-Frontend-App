import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibosDePagoComponent } from './recibos-de-pago.component';

describe('RecibosDePagoComponent', () => {
  let component: RecibosDePagoComponent;
  let fixture: ComponentFixture<RecibosDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecibosDePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibosDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
