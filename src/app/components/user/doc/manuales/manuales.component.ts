import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { Archivo } from 'src/app/models/archivo.interface';

@Component({
  selector: 'app-manuales',
  templateUrl: './manuales.component.html',
  styleUrls: ['./manuales.component.scss']
})
export class ManualesComponent implements OnInit {
  posts!: Archivo[];

     constructor(public arch: ArchivosService) {
      }

     filtroPost = "";


  ngOnInit(): void {
    this.arch.getArchivosOperacionales().subscribe((data) => {(this.posts! = data)});
  }
}
