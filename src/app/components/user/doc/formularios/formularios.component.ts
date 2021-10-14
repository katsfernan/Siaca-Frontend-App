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

  posts!: Archivo[];
  public data = sessionStorage.getItem('rol');
  public id= sessionStorage.getItem('id_empleado');

  constructor(public arch: ArchivosService,  private router: Router) { }

  filtroPost = "";

  ngOnInit(): void {

    this.arch.getFormularios().subscribe((data) => {(this.posts! = data)});
  }

}
