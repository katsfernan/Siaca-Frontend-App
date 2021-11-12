import { Component, OnInit } from '@angular/core';


import { FacturaVenta } from 'src/app/models/factura.interface';
import { FacturasService } from 'src/app/services/clientes/facturas.service';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  public facturas! : FacturaVenta[] ;

  public page = 1 

  public pageSize = 15

  public datosCargados: boolean = false

  public errorStatus: boolean = false

  public errorMensaje: any = ""

  
  public data = sessionStorage.getItem('rol');
  
  constructor(private service:FacturasService) { 

  }

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  obtenerFacturas(){
    this.service.listaFacturas()
    .subscribe((response) => {
      this.datosCargados = true
      this.facturas = response
      console.log(this.data)

      },
      (error) => {   
        this.errorStatus = true
        this.errorMensaje = error.error
        console.log (error.error)
      }
    )
  }
}

  

