import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetencionesService } from 'src/app/services/proveedores/retenciones.service';

declare var require: any
const JSPDF = require('jspdf')
import 'jspdf-autotable'
import { Proveedor } from '../../../../models/user.interface';

@Component({
  selector: 'app-lista-retenciones',
  templateUrl: './lista-retenciones.component.html',
  styleUrls: ['./lista-retenciones.component.scss']
})
export class ListaRetencionesISLRComponent implements OnInit {

  public datosCargados: boolean = false

  public errorStatus: boolean = false

  public opts = { minimumFractionDigits: 2 };

  public errorMensaje: any = ""

  public pagoRetencionesISLR: any ; 

  public retencionRenglones : any = [] ; 

  public proveedores: Proveedor[] = [] ; 

  public data = sessionStorage.getItem('rol');

  model: NgbDateStruct | undefined;

  model2:NgbDateStruct | undefined;

  retenciones_proveedor_form = new FormGroup ({
      fecha_i : new FormControl ('',Validators.required),
      fecha_f : new FormControl('', Validators.required)
  })

  retenciones_proveedor_form_empleado = new FormGroup({
    fecha_i : new FormControl ('',Validators.required),
    fecha_f : new FormControl('', Validators.required),
    prov_cod: new FormControl('', Validators.required)
  })

  constructor(private service:RetencionesService) { 

      this.getProveedores()

  }

  ngOnInit(): void {
  }

  getProveedores(){
    this.service.listaProveedores().
    subscribe((response)=>{
      this.proveedores = response
      console.log(response)
    },
    (error) => {   
      this.errorStatus = true
      this.errorMensaje = error.error
    })
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

    getRetencionesISLR_Empleados(form: any ){
      this.service.listaPagoRetencionesISLR_Empleados(form.fecha_i, form.fecha_f, form.prov_cod)
      .subscribe((response) => {
          this.datosCargados = true
          this.pagoRetencionesISLR = response
          console.log(response)
        },
        (error) => {   
          this.errorStatus = true
          this.errorMensaje = error.error
        })
      }

    parseDate(date: Date): string{
      let dd : any = date.getDate() + 1;
      let mm : any = date.getMonth() + 1 ;
      let yyyy : any = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return dd + '/' + mm + '/' + yyyy;
    }
  

    setRenglones(): any{
      var sumaMontos : number = 0
      var renglonArray:any = Object.entries(this.pagoRetencionesISLR)
      this.retencionRenglones = []
      console.log(renglonArray[1][1][0].pagRentReng_co_islr)
      for (let i = 0; i < renglonArray[1][1].length; i++) {
          let nuevoRenglon: any = []
          console.log(renglonArray[1][1][i].fecha)
          let fec_emis : any = new Date(renglonArray[1][1][i].fecha);
          console.log(fec_emis)
          fec_emis = this.parseDate(fec_emis);
  
          nuevoRenglon.push(fec_emis)
          nuevoRenglon.push(renglonArray[1][1][i].numPago)
          nuevoRenglon.push(renglonArray[1][1][i].tipoPago)
          nuevoRenglon.push(renglonArray[1][1][i].nroDoc)
          nuevoRenglon.push(renglonArray[1][1][i].nroControl)
          nuevoRenglon.push(renglonArray[1][1][i].pagRentReng_monto.toLocaleString(undefined,this.opts))
          nuevoRenglon.push(renglonArray[1][1][i].pagRentReng_monto.toLocaleString(undefined,this.opts))
          nuevoRenglon.push(renglonArray[1][1][i].pagRentReng_monto.toLocaleString(undefined,this.opts))
          nuevoRenglon.push(renglonArray[1][1][i].pagRentReng_porc_retn.toLocaleString(undefined,this.opts) + '%')
          nuevoRenglon.push(renglonArray[1][1][i].pagRentReng_co_islr)
          nuevoRenglon.push(renglonArray[1][1][i].pagRentReng_sustraendo.toLocaleString(undefined,this.opts) )
          nuevoRenglon.push(renglonArray[1][1][i].pagRentReng_monto_reten.toLocaleString(undefined,this.opts) )
          
          
          this.retencionRenglones.push(nuevoRenglon)

          sumaMontos = sumaMontos +  renglonArray[1][1][i].pagRentReng_monto_reten
    
      }

      this.retencionRenglones.push( ['Totales', '-----------', '-------', '------', '----------', '-----------------', 
      '--------------------', '-------------------------', '------', '---------------', '------------', sumaMontos.toLocaleString(undefined,this.opts) ])
    
    }
  

    imprimirPDF(reten: any){
      let pdf = new JSPDF('l', 'mm',[785,600] )
      
  
      let x : number = 0
      let y : number = 0
  
      pdf.setFontSize(9);
      pdf.setFont('helvetica');

      
      pdf.setLineWidth(0.4).rect(x + 14, y + 10 , 249 , 32)

      let logo = new Image();
      logo.src = 'assets/logo_retencionISLR.png';
      pdf.addImage(logo, 'png', x + 15 , y + 15 , 25, 25);
      

      pdf.text('SIACA Servicios Integrales Aeronáuticos, C.A.', x +48, y + 20)
      pdf.text('R.I.F.: J-40176148-8', x + 48, y + 24)

      pdf.text('I.S.L.R - COMPROBANTE DE RETENCIÓN DE I.S.L.R.', x + 105, y +  y + 35)
      pdf.text('Fecha: Desde ' + reten.fecha_i + ' Hasta ' + reten.fecha_f + ';', x + 115, y + 38)

      pdf.setLineWidth(0.4).rect(x + 14, y + 46 , 249 , 35)

      pdf.text('Proveedor / Beneficiario', x + 70, y + 50)

      pdf.text('Proveedor / Beneficiario:', x + 15 , y + 60)
      pdf.setLineWidth(0.4).line(x + 14, y + 52 , x +263 , y + 52)

      pdf.text('R.I.F.:', x + 15 , y + 65)
      pdf.text('N.I.T.:', x + 15 ,  y + 70)
      pdf.text('Dirección:', x + 15, y + 75)

      pdf.text(reten.proveedor.pro_rif.substring(2,9), x +  60 , y + 60 )
      pdf.text(reten.proveedor.pro_rif, x + 60 , y + 65)

      let sliceDirec = reten.proveedor.pro_direc1

      pdf.text(sliceDirec.slice(0,Math.ceil(sliceDirec.length/2)), x + 60, y + 75)
      pdf.text(sliceDirec.slice(sliceDirec.length/2+1,sliceDirec.length), x + 60, y + 78)

      pdf.setLineWidth(0.4).line(x + 130 , y + 46 , x +130 , y + 81 )
      pdf.text('Empresa', x + 195, y + 50)
      pdf.text('SIACA Servicios Integrales Aeronáuticos, C.A.', x + 152, y + 60)
      pdf.text('R.I.F.:', x + 134, y + 65 )
      pdf.text('J-40176148-8', x + 149, y + 65)
      pdf.text('N.I.T.:', x + 137 , y + 70 )
      pdf.text('Direccion: ', x + 134, y + 75)
      pdf.setFontSize(7).text("AV. LA ARMADA, EDIF. AEROUPUERTO INTERNACIONAL ''SIMÓN BOLÍVAR'' NIVEL SOTANO 1,  ",x + 149 , y + 75)
      pdf.setFontSize(7).text('PISO RAMPA 28, OF.32, SECTOR MAIQUETIA, CATIA LA MAR', x + 149, y + 78)
    
      this.setRenglones()

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
      
        startY: y + 83,
        head: [['Fecha','Número Pago','Tipo','N° Doc.','N° Control.','Monto de Documento',
            'Monto Abonado','Monto Objeto a Retención', 'Tarifa %', 'Código Concepto',
            'Sutraendo','Impuesto Retenido']],

        body: this.retencionRenglones

  
      })

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
      
        startY: (pdf as any).lastAutoTable.finalY ,
        head: [],

      })



      pdf.save('RETENCIONES_ISLR_DESDE_' + reten.fecha_i + '_HASTA_' + reten.fecha_f + '.pdf' )
}

}


