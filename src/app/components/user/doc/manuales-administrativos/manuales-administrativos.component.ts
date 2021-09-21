import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manuales-administrativos',
  templateUrl: './manuales-administrativos.component.html',
  styleUrls: ['./manuales-administrativos.component.scss']
})
export class ManualesAdministrativosComponent implements OnInit {

  constructor() { }

  filtroPost = "";

    posts = [
    {
      id: 1,
      titulo: "MA-GOP-001 ",
      
    },
    {
      id: 2,
      titulo: "MA-SMS-002",
      
    },
    {
      id: 3,
      titulo: "MA-SST-003",
      
    },
    {
      id: 4,
      titulo: "MA-GOP-004",
      
    },
    {
      id: 5,
      titulo: "MA-MNT-005",
      
    },
    {
      id: 6,
      titulo: "MA-GOP-006 ",
      
    },
    {
      id: 7,
      titulo: "MA-GOP-007 ",
      
    },
    {
      id: 8,
      titulo: "MA-SMS-008 ",
      
    },
    {
      id: 9,
      titulo: "MA-SAP-009 ",
      
    },
    {
      id: 10,
      titulo: "MA-DSP-012",
      
    }
  ];

  ngOnInit(): void {
  }

}
