import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { Archivo } from 'src/app/models/archivo.interface';

@Component({
  selector: 'app-manuales-administrativos',
  templateUrl: './manuales-administrativos.component.html',
  styleUrls: ['./manuales-administrativos.component.scss']
})
export class ManualesAdministrativosComponent implements OnInit {

  posts!: Archivo[];
  
  constructor(public arch: ArchivosService) { }

  filtroPost = "";

  ngOnInit(): void {
    this.arch.getArchivosAdministrativos().subscribe((data) => {(this.posts! = data)});
  }

}
