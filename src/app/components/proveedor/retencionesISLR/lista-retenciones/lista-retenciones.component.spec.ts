import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRetencionesComponent } from './lista-retenciones.component';

describe('ListaRetencionesComponent', () => {
  let component: ListaRetencionesComponent;
  let fixture: ComponentFixture<ListaRetencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRetencionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRetencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
