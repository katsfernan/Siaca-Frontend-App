import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from 'src/app/services/clientes/facturas.service';
import { FacturaVentaReporte, FacturaVentaRenglon } from '../../../../models/factura.interface';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';

declare var require: any
const JSPDF = require('jspdf')
import 'jspdf-autotable'



@Component({
  selector: 'app-facturas-detalle',
  templateUrl: './facturas-detalle.component.html',
  styleUrls: ['./facturas-detalle.component.scss']
})
export class FacturasDetalleComponent implements OnInit {

  //Componente Hijo Modal 

  @ViewChild('modalInfo') modal_info!: TemplateRef<any>;


  public opts = { minimumFractionDigits: 2 };

  public facturaDetalle! : FacturaVentaReporte ;

  public facturaRenglones : FacturaVentaRenglon[] = [];

  public datosCargados: boolean = false;

  public errorStatus:boolean = false;

  public errorMensaje:any = "";



  title = 'ng-bootstrap-modal-demo';
  closeResult: string | undefined;
  modalOptions:NgbModalOptions;

  constructor(private activerouter: ActivatedRoute,
    private service:FacturasService, 
    private modalService: NgbModal,
    ) {

      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
     }

  ngOnInit(): void {
    
    this.obtenerFacturaDetalle()

  }

  obtenerFacturaDetalle(){
    let facturaId: number  = parseInt(this.activerouter.snapshot.paramMap.get('id')!);
    this.service.facturaDetalle(facturaId).subscribe((response) => {
      this.datosCargados = true
      this.facturaDetalle = response
      },
      (error) => {   
        this.errorStatus = true
        this.errorMensaje = error.error
      }
    )
  

  }

  open(title: any, content: any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = title;
    modalRef.componentInstance.my_modal_content = content;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  capitalizeString (cadena: string ): string {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
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

  setRenglones(): void{

    var renglonArray = Object.entries(this.facturaDetalle.renglon);
    for (let i = 0; i < renglonArray.length; i++) {
      let nuevoRenglon: any = []
      nuevoRenglon.push(renglonArray[i][1].articuloCod)
      nuevoRenglon.push(renglonArray[i][1].articuloDesc)
      nuevoRenglon.push(renglonArray[i][1].facren_total_art.toLocaleString(undefined,this.opts))
      nuevoRenglon.push(renglonArray[i][1].facren_precio_venta.toLocaleString(undefined,this.opts))
      nuevoRenglon.push(renglonArray[i][1].facren_reng_neto.toLocaleString(undefined,this.opts))
      console.log(nuevoRenglon)
      this.facturaRenglones.push(nuevoRenglon)
  }
}
  

  imprimirPDF():void {

    var pdf = new JSPDF();

    let x : number = 10
    let y : number = 10
    
    let enc: any = this.facturaDetalle.encabezado

    pdf.setFontSize(8);
    pdf.setFont('helvetica');
    pdf.text('Cliente: ' + enc.clienteDesc, x+10, y + 5)

    pdf.text('RIF:' + enc.clienteDocNum, x + 10, y + 12 )
    
    let sliceDirec = enc.clienteDireccion

    pdf.text('Direccion: ', x +10, y+19)
    pdf.text(sliceDirec.slice(0,Math.ceil(sliceDirec.length/3)), x + 25, y + 19)
    pdf.text(sliceDirec.slice(sliceDirec.length/3+1,Math.ceil(sliceDirec.length*2/3)), x + 25, y + 24)
    pdf.text(sliceDirec.slice(sliceDirec.length*2/3 + 1,sliceDirec.length), x + 25, y + 29)
    pdf.text('Teléfonos: ' + enc.clienteTelefonos, x + 10, y + 36)

    pdf.text('Factura: ' + enc.fac_doc_num + "", x+130, y+5)

    let fec_emis : any = new Date(enc.fac_fecha_emi);
    fec_emis = this.parseDate(fec_emis);
    let fec_venc : any = new Date(enc.fac_fecha_venc);
    fec_venc = this.parseDate(fec_venc);

    pdf.text('Fecha emisión: ' + fec_emis, x + 130, y + 12 )
    pdf.text('Fecha vencimiento: ' + fec_venc, x + 130 , y + 19)

    this.setRenglones()

    pdf.autoTable({
      theme : 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 8
      },
      headerStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
    },
      startY: y + 46,
      head: [['CÓDIGO', 'DESCRIPCIÓN', 'CANTIDAD','PRECIO(Bs.)','Total(Bs.)']],
      body: 
        this.facturaRenglones

    })
    
    let monto_usd: any  =  enc.fac_monto_total / enc.fac_tasa

    pdf.text('Son USD:    '+ (monto_usd).toLocaleString(undefined, this.opts) + ' Según tasa cambiaria referencial BCV Bs./USD',  x + 10,y + 240)
    pdf.text(enc.fac_tasa.toLocaleString(undefined, this.opts) + '  al  ' + fec_emis , x+ 10, y + 245)

    pdf.setFont('helvetica')
    pdf.text ('Favor emitir cheque a nombre de', x + 10, y+ 252)

    pdf.text('SIACA SERVICIOS INTEGRALES AERONAUTICOS, C.A.', x + 10 , y + 257)

    pdf.autoTable({
      theme : 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 9
      },
      startY: y + 230,
      margin: {

        left: 130
      },
      head: [['Total Exonerado (Bs.)','0,00']],
      body: 
      [
        ['Base Imponible (Bs.)',enc.fac_total_bruto.toLocaleString(undefined, this.opts)],
        ['I.V.A (Bs.) 16,00 %', enc.fac_monto_imp.toLocaleString(undefined, this.opts)],
      ]

    })

    // pdf.setLineWidth(1.0)
    pdf.setDrawColor(4, 4, 4)
    pdf.line( x + 120, (pdf as any).lastAutoTable.finalY + 2, 200, (pdf as any).lastAutoTable.finalY + 2);
    pdf.autoTable({
      theme : 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 9
      },
      startY: (pdf as any).lastAutoTable.finalY + 5,
      margin: {

        left: 130
      },
      head: [['Total Operación(Bs.)',enc.fac_monto_total.toLocaleString(undefined, this.opts)]]


    })
    
    pdf.save('FACTURA N°_' + enc.fac_doc_num + '.pdf')
  }
    
  }

