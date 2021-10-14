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
  posts!: Archivo[];
  public data = sessionStorage.getItem('rol');
  public id= sessionStorage.getItem('id_empleado');


     constructor(public arch: ArchivosService, private router: Router) {
      }

     filtroPost = "";


  ngOnInit(): void {
    this.arch.getArchivosOperacionales().subscribe((data) => {(this.posts! = data)});
  }

}
