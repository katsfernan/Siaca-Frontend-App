import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manuales',
  templateUrl: './manuales.component.html',
  styleUrls: ['./manuales.component.scss']
})
export class ManualesComponent implements OnInit {

     constructor() { }

     filtroPost = "";

    posts = [
    {
      id: 1,
      titulo: "MO-GOP-001 Manual de Capacitación",
      
    },
    {
      id: 2,
      titulo: "MO-SMS-002 Plan de Respuesta Ante Emergencias",
      
    },
    {
      id: 3,
      titulo: "MO-SST-003   Programa de Seguridad y Salud en el Trabajo",
      
    },
    {
      id: 4,
      titulo: "MO-GOP-004 Manual de Plataforma",
      
    },
    {
      id: 5,
      titulo: "MO-MNT-005 Manual de Mantenimiento de Vehículos",
      
    },
    {
      id: 6,
      titulo: "MO-GOP-006 Manual de Animales Vivos",
      
    },
    {
      id: 7,
      titulo: "MO-GOP-007 Manual de Mercancías Peligrosas",
      
    },
    {
      id: 8,
      titulo: "MO-SMS-008 Manual de Gestión de la Seguridad Operacional SMS",
      
    },
    {
      id: 9,
      titulo: "MO-SAP-009 Programa de Facilitación",
      
    },
    {
      id: 10,
      titulo: "MO-DSP-012 Manual de Asistencia al Despacho de Vuelos",
      
    }
  ];
 

  ngOnInit(): void {
  }

}
