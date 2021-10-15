import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { Archivo } from 'src/app/models/archivo.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-manuales',
  templateUrl: './manuales.component.html',
  styleUrls: ['./manuales.component.scss']
})
export class ManualesComponent implements OnInit {
  
  //Lista de Manuales
  posts!: Archivo[];

  //variable con el rol de usuario
  public data = sessionStorage.getItem('rol');

  //variable con rol de empleado
  public id= sessionStorage.getItem('id_empleado');


     constructor(public arch: ArchivosService, private router: Router) {
      }

  //Variable para el filtro del buscador
     filtroPost = "";


  ngOnInit(): void {
    // Llamada a la Lista de Manuales
    this.arch.getArchivosOperacionales().subscribe((data) => {(this.posts! = data)});
  }

}
