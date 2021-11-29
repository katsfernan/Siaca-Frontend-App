import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetencionesService } from 'src/app/services/proveedores/retenciones.service';

declare var require: any
const JSPDF = require('jspdf')
import 'jspdf-autotable'

@Component({
  selector: 'app-lista-retenciones',
  templateUrl: './lista-retenciones.component.html',
  styleUrls: ['./lista-retenciones.component.scss']
})
export class ListaRetencionesISLRComponent implements OnInit {

  public datosCargados: boolean = false

  public errorStatus: boolean = false

  public errorMensaje: any = ""

  public pagoRetencionesISLR: any ; 

  public data = sessionStorage.getItem('rol');

  model: NgbDateStruct | undefined;

  model2:NgbDateStruct | undefined;

  retenciones_proveedor_form = new FormGroup ({
      fecha_i : new FormControl ('',Validators.required),
      fecha_f : new FormControl('', Validators.required)
  })

  constructor(private service:RetencionesService) { }

  ngOnInit(): void {
  }

  getRetencionesISLR(form: any ){
    
    
    this.service.listaPagoRetencionesISLR(form.fecha_i, form.fecha_f)
    .subscribe((response) => {
        this.datosCargados = true
        this.pagoRetencionesISLR = response
      },
      (error) => {   
        this.errorStatus = true
        this.errorMensaje = error.error
      })
    }

    imprimirPDF(reten: any){
      let pdf = new JSPDF('l', 'mm',[785,600] )
      
  
      let x : number = 0
      let y : number = 0
  
      pdf.setFontSize(9);
      pdf.setFont('helvetica');

      pdf.text('Profit Plus Adminitrativo' , x +40, y + 20)
      pdf.text('SIACA Servicios Integrales Aeronáuticos, C.A.', x + 40, y + 25)
      pdf.text('R.I.F.: J-40176148-8', x + 40, y + 30)

      pdf.text('I.S.L.R - COMPROBANTE DE RETENCIÓN DE I.S.L.R.', x + 105, y +  y + 40)
      pdf.text('Fecha: Desde ' + reten.fecha_i + ' Hasta ' + reten.fecha_f + ';', x + 120, y + 45)

      pdf.text('Proveedor / Beneficiario', x + 70, y + 65)

      pdf.text('Proveedor / Beneficiario:', x + 15 , y + 75)
      pdf.text('R.I.F.:', x + 15 , y + 80)
      pdf.text('N.I.T.:', x + 15 ,  y + 85)
      pdf.text('Dirección:', x + 15, y + 90)

      pdf.text(reten.proveedor.pro_rif.substring(2,9), x +  60 , y + 75 )
      pdf.text(reten.proveedor.pro_rif, x + 60 , y + 80)

      let sliceDirec = reten.proveedor.pro_direc1

      pdf.text(sliceDirec.slice(0,Math.ceil(sliceDirec.length/2)), x + 60, y + 90)
      pdf.text(sliceDirec.slice(sliceDirec.length/2+1,sliceDirec.length), x + 60, y + 93)

      pdf.text('Empresa', x + 205, y + 65)
      pdf.text('SIACA Servicios Integrales Aeronáuticos, C.A.', x + 155, y + 75)
      pdf.text('R.I.F.:', x + 140, y + 80 )
      pdf.text('J-40176148-8', x + 155, y + 80)
      pdf.text('N.I.T.:', x + 140 , y + 85 )
      pdf.text('Direccion: ', x + 140, y + 90)
      pdf.setFontSize(7).text("AV. LA ARMADA, EDIF. AEROUPUERTO INTERNACIONAL ''SIMÓN BOLÍVAR'' NIVEL SOTANO 1,  ",x + 155 , y + 90)
      pdf.setFontSize(7).text('PISO RAMPA 28, OF.32, SECTOR MAIQUETIA, CATIA LA MAR', x + 155, y + 93)
      
      pdf.autoTable({
        theme : 'plain',
        styles: {
          font: 'helvetica',
          fontSize: 9
        },
        headStyles:{
          valign: 'middle',
          halign : 'center',
          lineWidth: 0.4,
          lineColor: [4,4,4]
        },
  
        bodyStyles: {
          lineWidth: 0.4,
          lineColor: [4,4,4]
      },
      
        startY: y + 103,
        head: [['Fecha','Número Pago','Tipo','N° Doc.','Monto de Documento',
            'Monto Abonado','Monto Objeto a Retención', 'Tarifa %', 'Código Concepto',
            'Sutraendo','Impuesto Retenido']],
        body: reten.pagos_retencion_islr
  
      })

      pdf.save()
}

}


