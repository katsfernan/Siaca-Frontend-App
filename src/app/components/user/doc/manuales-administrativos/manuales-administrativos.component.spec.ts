import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualesAdministrativosComponent } from './manuales-administrativos.component';

describe('ManualesAdministrativosComponent', () => {
  let component: ManualesAdministrativosComponent;
  let fixture: ComponentFixture<ManualesAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualesAdministrativosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualesAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
