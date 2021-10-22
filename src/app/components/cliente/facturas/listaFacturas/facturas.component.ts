import { Component, OnInit } from '@angular/core';


import { FacturaVenta } from 'src/app/models/factura.interface';
import { FacturasService } from 'src/app/services/clientes/facturas.service';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  public facturas = <FacturaVenta[]> {};
  
  constructor(private service:FacturasService) { }

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  obtenerFacturas(){
    this.service.listaFacturas()
    .subscribe(response  => this.facturas = response);
  }

}
