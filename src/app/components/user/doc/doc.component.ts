import { Component, OnInit } from '@angular/core';
//import Swal from 'sweetalert2/dist/sweetalert2.js'




@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})


export class DocComponent implements OnInit {
 

  constructor() { }

  ngOnInit(): void {
  }

}




/*Swal.fire({
  title: 'Notificación',
  text: "Contenido",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Guardar',
  cancelButtonText: 'Borrar'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: 'Guardado',
      icon: 'success',
      text: 'Su Notificación ha sido guardada',
      confirmButtonColor: '#08A75A',
      confirmButtonText: 'Aceptar'
    })
  }
})*/


