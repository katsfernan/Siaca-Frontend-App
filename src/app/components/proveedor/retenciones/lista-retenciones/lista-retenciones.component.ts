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

  
  public page = 1 

  public pageSize = 300

  public opts = { minimumFractionDigits: 2 };

  public pagoRetencionesIva = <PagoRetencionIva[]> {};

  public retencionRenglones : any | PagoRetencionIva[] = [];


  public datosCargados: boolean = false

  public errorStatus: boolean = false

  public errorMensaje: any = ""

  public data = sessionStorage.getItem('rol');

  constructor(private service:RetencionesService) { }

  ngOnInit(): void {
    this. obtenerListaPagoRetencionesIva();
  }

  obtenerListaPagoRetencionesIva(){
    this.service.listaPagoRetencionesIva()
    .subscribe((response) => {
      this.datosCargados = true
      this.pagoRetencionesIva = response

      },
      (error) => {   
        this.errorStatus = true
        this.errorMensaje = error.error
      }
    )
  }

  parseDate(date: Date): string{
    let dd : any = date.getDate();
    let mm : any = date.getMonth() + 1;
    let yyyy : any = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }

  setRenglones(retencionid : number): void{

    var renglonArray = Object.entries(this.pagoRetencionesIva)


    for (let i = 0; i < renglonArray.length; i++) {
      if (renglonArray[i][1].pagRetIva_doc_num ==retencionid) {
        let nuevoRenglon: any = []
        let fec_emis : any = new Date(renglonArray[i][1].pagRetIva_fecha_doc);
        fec_emis = this.parseDate(fec_emis);
  
        nuevoRenglon.push(1 + "")
        nuevoRenglon.push(fec_emis)
        nuevoRenglon.push(renglonArray[i][1].pagRetIva_doc_num)
        nuevoRenglon.push(renglonArray[i][1].pagRetIva_doc_num_control)
        nuevoRenglon.push(' ')
        nuevoRenglon.push(' ')
        nuevoRenglon.push('0'+ i+1 +"" +'-reg')
  
        if (renglonArray[i][1].pagRetIva_nro_doc_afectado) {
          nuevoRenglon.push(renglonArray[i][1].pagRetIva_nro_doc_afectado)
        }
        else {
          nuevoRenglon.push(' ')
        }
        let baseImponible = renglonArray[i][1].pagRetIva_base_imponible
        let alicuota = renglonArray[i][1].pagRetIva_alicuota
        nuevoRenglon.push(renglonArray[i][1].pagRetIva_monto_documento.toLocaleString(undefined,this.opts))
        nuevoRenglon.push(' ')
        nuevoRenglon.push(baseImponible.toLocaleString(undefined,this.opts))
        nuevoRenglon.push( alicuota.toLocaleString(undefined,this.opts) + "%")
        nuevoRenglon.push((baseImponible / alicuota).toLocaleString(undefined,this.opts))
        nuevoRenglon.push (renglonArray[i][1].pagRetIva_monto_ret_imp.toLocaleString(undefined,this.opts))
        this.retencionRenglones = []
        this.retencionRenglones.push(nuevoRenglon)
      } 
    }
  }

  imprimirPDF(reten: PagoRetencionIva){
    let pdf = new JSPDF('l', 'mm',[785,600] )
    

    let x : number = 0
    let y : number = 0

    pdf.setFontSize(7);
    pdf.setFont('helvetica');

    pdf.setFontType('bold').text('Decreto con Rango, Valor y Fuerza de Ley de Reforma de Ley de Impuesto al Valor Agregado', x + 32, y + 9 )
    pdf.setFontType('normal').text('N° 1436 del 17 de noviembre de 2014', x+ 58 , y + 12)
    pdf.text('(Ley de IVA - Art. 11: "La administración Tributaria podrá designar como responsables del pago del impuesto en calidad', x + 18, y + 16  )
    pdf.text('de agenter de retención a quienes por sus funciones públicas o por razón de sus actividades privadas intervengan en', x + 19,  y + 19 )
    pdf.text('operaciones gravadas con el impuesto establecido en este Decreto con Rango, Valor y Fuerza de Ley ")', x + 24, y + 22)

    pdf.setLineWidth(0.5)
    pdf.rect(17,26, 90, 10)
    pdf.text('2. NOMBRE O RAZON SOCIAL DEL AGENTE DE RETENCION', x + 19, y + 29)
    pdf.text('SIACA Servicios Integrales Aeronauticos, C.A.',x + 19, y + 32)

    pdf.rect(117,26, 100, 10)
    pdf.text('3. REGISTRO DE INFORMACION FISCAL DEL AGENTE DE RETENCION', x + 119, y + 29)
    pdf.text('J-40176148-8', x + 119, y + 32)

    pdf.rect(227,26, 35, 10)
    pdf.text('4. PERIODO FISCAL', x + 229 , y + 29)
    pdf.text('AÑO:' + reten.pagRetIva_periodo.substring(0,4) + ' / MES:' + reten.pagRetIva_periodo.substring(4,2),
              x + 229, y + 33 )

    pdf.rect(227,12,35,10)
    pdf.text('1. FECHA EMISION', x + 229, y+ 15)
    let fec_emis : any = new Date(reten.pagRetIva_fecha_doc);
    fec_emis = this.parseDate(fec_emis);
    pdf.text(fec_emis, x + 229, y + 19)

    pdf.rect(182,12,35,10)
    pdf.text('0.NRO. COMPROBANTE', x + 184, y + 15)
    pdf.text(reten.pagRetIva_num_comprobante, x + 184, y + 19)

    pdf.rect(17, 42, 245 , 10)
    pdf.text('5. DIRECCION FISCAL DEL AGENTE DE RETENCION', x + 19, y + 46)
    pdf.text('Av. La Armada, Edif. Aeropuerto Internacional "Simon Bolivar" Nivel Sotano 1, Piso Rampa 28, Of. 32. Sector Maiquetia, Catia la Mar', x + 19, y + 49)
  
    pdf.rect(17, 58, 90 , 10)
    pdf.text('6. NOMBRE O RAZON SOCIAL DEL SUJETO RETENIDO', x + 19, y + 62)
    pdf.text(reten.provDesc.toUpperCase(),x + 19, y + 66)

    pdf.rect(117, 58, 90 , 10)
    pdf.text('7. REGISTRO DE INFORMACION FISCAL DEL SUJETO RETENIDO(R.I.F.)', x + 119, y + 62)
    pdf.text(reten.provRif.toUpperCase(),x + 119, y + 66)

    pdf.rect(17, 74, 245 , 10)
    pdf.text('DIRECCION FISCAL DEL SUJETO RETENIDO', x + 19, y + 78)
    pdf.text(reten.provDireccion , x + 19, y + 82)

    this.setRenglones(reten.pagRetIva_doc_num)

    pdf.autoTable({
      theme : 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 7
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
    
      startY: y + 92,
      head: [['Oper. Nro.','Fecha', 'N° de Factura','N° de Control','N° de Nota de Débito',
              'N° de Nota de Débito','Tipo de Trans.','N° del Documento Afectado',
              'Total Compras con I.V.A.','Compras sin derecho a Crédito','Base Imponible',
              '% alic.','Impuesto I.V.A.','I.V.A. Retenido']],
      body: this.retencionRenglones

    })
    pdf.text('0,00', x + 190, (pdf as any).lastAutoTable.finalY + 3 )
    pdf.text(this.retencionRenglones[0][10], x + 198, (pdf as any).lastAutoTable.finalY + 3)
    pdf.text(this.retencionRenglones[0][12], x + 229, (pdf as any).lastAutoTable.finalY + 3)
    pdf.text(this.retencionRenglones[0][13], x + 247 ,(pdf as any).lastAutoTable.finalY + 3)

    let sello = new Image();
    sello.src = 'assets/sello_siaca.png';
    pdf.addImage(sello, 'jpeg', x + 95 , y + 165 , 40, 15);

    let firma = new Image();
    firma.src = 'assets/firma_retencion_siaca.png';
    pdf.addImage(firma, 'jpeg', x + 105 , y + 158 , 20, 35);

    pdf.setFontSize(12).text('Firma del Agente de Retención: ____________________', x + 30, y + 180 )
    pdf.setFontSize(12).text('Firma del Sujeto Retenido: ________________________', x + 150, y + 180 )

    pdf.setFontSize(12).text('Fecha de Entrega: ____/____/____', x + 30, y + 190)
    pdf.setFontSize(12).text('Fecha de Recepción: ____/____/____', x + 150, y + 190)
    
    
    pdf.setDrawColor(4, 4, 4).setLineWidth(0.5).line(x + 21, y + 197,x +260 , y + 197)
    
    pdf.setFontSize(7).setFontType('bold').text('Este comprobante se emite según lo establecido en el Artículo N°16 de la Providencia Administrativa SNAT/2015/0049 de fecha 14/07/2015 publicada en Gaceta Oficial N°40.720 de fecha 10 de agosto de 2015'
    , x + 20, y + 200)


    pdf.save('RETENCION_IVA_N°_' + reten.pagRetIva_num_comprobante + '.pdf')



    
  }
}
