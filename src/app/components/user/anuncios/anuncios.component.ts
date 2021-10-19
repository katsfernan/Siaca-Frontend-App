import { Component, OnInit } from '@angular/core';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { Anuncio, Mensaje, Actualizar } from 'src/app/models/anuncios.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {


  //Objeto que trae los datos del anuncio
    Form = new FormGroup({
    anu_titulo : new FormControl('', Validators.required),
    anu_mensaje : new FormControl('', Validators.required),
    id :  new FormControl('', Validators.required)
  });

  FormActualizar = new FormGroup({
    anuncio_id : new FormControl('', Validators.required)
  });


  //lista de anuncios
  mensajes!: Mensaje[];
  actualizar!: Actualizar[];

  //variable que guarda el rol del usuario
  public data = sessionStorage.getItem('rol');

  constructor(public anuncio: AnunciosService, private router: Router) { }

  ngOnInit(): void {
    //llamada a la lista de anuncios
    this.anuncio.anuncios().subscribe((data) => {(this.mensajes! = data)});
  }

  //Metodo para crear un anuncio
 crearAnuncio(form:Anuncio){
  this.anuncio.nuevoAnuncio(form).subscribe((data)=>{
    var res : any =data;

  });
    console.log("datos" ,this.data);
 }

 refresh(){
  window.location.reload();
 }

 anuncioVisto(id : Actualizar){
   this.anuncio.actualizarAnuncio(id).subscribe((data)=>{
    var res : any =data;
    this.ngOnInit();
  });
   console.log("id",this.data);
   console.log("id",id);
 }


}
