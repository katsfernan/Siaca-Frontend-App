import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRetencionesISLRComponent } from './lista-retencionesISLR.component';

describe('ListaRetencionesComponent', () => {
  let component: ListaRetencionesISLRComponent;
  let fixture: ComponentFixture<ListaRetencionesISLRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRetencionesISLRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRetencionesISLRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
