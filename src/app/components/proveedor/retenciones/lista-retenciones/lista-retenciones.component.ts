import { Component, OnInit } from '@angular/core';
import { PagoRetencionIva } from 'src/app/models/retencion.interface';
import { RetencionesService } from '../../../../services/proveedores/retenciones.service';

declare var require: any
const JSPDF = require('jspdf')
import 'jspdf-autotable'

@Component({
  selector: 'app-lista-retenciones',
  templateUrl: './lista-retenciones.component.html',
  styleUrls: ['./lista-retenciones.component.scss']
})
export class ListaRetencionesComponent implements OnInit {

  public pagoRetencionesIva = <PagoRetencionIva[]> {};
  
  constructor(private service:RetencionesService) { }

  ngOnInit(): void {
    this. obtenerListaPagoRetencionesIva();
  }

  obtenerListaPagoRetencionesIva(){
    this.service.listaPagoRetencionesIva()
    .subscribe(response  => this.pagoRetencionesIva = response);
  }


  imprimirPDF(){
    let pdf = new JSPDF()

    
  }
}
