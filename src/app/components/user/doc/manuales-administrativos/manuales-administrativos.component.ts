import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { Archivo } from 'src/app/models/archivo.interface';

@Component({
  selector: 'app-manuales-administrativos',
  templateUrl: './manuales-administrativos.component.html',
  styleUrls: ['./manuales-administrativos.component.scss']
})
export class ManualesAdministrativosComponent implements OnInit {


   //Lista de Manuales
  posts!: Archivo[];

  //variable con el rol de usuario
  public data = sessionStorage.getItem('rol');

  //variable con rol de empleado
  public id= sessionStorage.getItem('id_empleado');
  
  constructor(public arch: ArchivosService) { }

  //Variable para el filtro del buscador
  filtroPost = "";

  ngOnInit(): void {
    // Llamada a la Lista de Manuales
    this.arch.getArchivosAdministrativos().subscribe((data) => {(this.posts! = data)});
  }

}
