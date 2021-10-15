import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { Archivo } from 'src/app/models/archivo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss']
})
export class FormulariosComponent implements OnInit {

  //Lista de Formularios
  posts!: Archivo[];

  //variable con el rol de usuario
  public data = sessionStorage.getItem('rol');

  //variable con rol de empleado
  public id= sessionStorage.getItem('id_empleado');

  constructor(public arch: ArchivosService,  private router: Router) { }

  //Variable para el filtro del buscador
  filtroPost = "";

  ngOnInit(): void {
    // Llamada a la Lista de Formularios
    this.arch.getFormularios().subscribe((data) => {(this.posts! = data)});
  }

}
