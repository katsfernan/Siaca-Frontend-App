import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { Anuncio, Mensaje, Actualizar } from 'src/app/models/anuncios.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})


export class DocComponent implements OnInit {
 
  public data = sessionStorage.getItem('rol');
  
  mensajes!: Mensaje[];
  
  constructor(public anuncio: AnunciosService, private router: Router) { }

  ngOnInit(): void {

    this.anuncio.anuncios().subscribe((data) => {(this.mensajes! = data)});
  }

  
  
}