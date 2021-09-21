import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss']
})
export class FormulariosComponent implements OnInit {

  constructor() { }

  filtroPost = "";

    posts = [
    {
      id: 1,
      titulo: "Formulario-001 ",
      
    },
    {
      id: 2,
      titulo: "Formulario-002",
      
    },
    {
      id: 3,
      titulo: "Formulario-003",
      
    },
    {
      id: 4,
      titulo: "Formulario-004",
      
    },
    {
      id: 5,
      titulo: "Formulario-005",
      
    },
    {
      id: 6,
      titulo: "Formulario-006 ",
      
    },
    {
      id: 7,
      titulo: "Formulario-007 ",
      
    },
    {
      id: 8,
      titulo: "Formulario-008 ",
      
    },
    {
      id: 9,
      titulo: "Formulario-009 ",
      
    },
    {
      id: 10,
      titulo: "Formulario-012",
      
    }
  ];

  ngOnInit(): void {
  }

}
