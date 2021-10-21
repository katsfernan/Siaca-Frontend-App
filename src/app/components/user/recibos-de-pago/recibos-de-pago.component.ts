import { Component, OnInit } from '@angular/core';
import { RecibosService } from 'src/app/services/recibos.service';
import { Anuncio, Mensaje, Actualizar } from 'src/app/models/anuncios.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-recibos-de-pago',
  templateUrl: './recibos-de-pago.component.html',
  styleUrls: ['./recibos-de-pago.component.scss']
})
export class RecibosDePagoComponent implements OnInit {



  //Objeto que trae los datos del anuncio
  Form = new FormGroup({
    fecha_ini : new FormControl('', Validators.required),
    fecha_fin : new FormControl('', Validators.required),
  });

  //variable que guarda el rol del usuario
  recibos!: any;
  recibo!: any;
  paginaActual : number = 1;
  constructor(public reciboService: RecibosService, private router: Router) {
  }

  ngOnInit(): void {
    this.reciboService.getRecibos().subscribe((data) => {
      this.recibos! = data
    });
  }

  onClick(reci_num: number){
    this.reciboService.getRecibo(reci_num).subscribe((data) => {
      this.recibo! = data
      this.printPDF(this.recibo)
    });
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

  printPDF(response: any){
 
    var doc = new jsPDF({
      orientation: "l",
      format: "letter"
    });

    doc.rect(10, 10, 260, 28);
    doc.rect(10, 38, 260, 8);
    doc.rect(10, 49, 260, 16);
    doc.rect(10, 65, 260, 100);
    doc.rect(10, 65, 260, 12);
    doc.rect(10, 65, 25, 100);
    doc.rect(35, 65, 95, 100);
    doc.rect(130, 65, 35, 110);
    doc.rect(165, 65, 35, 110);
    doc.rect(200, 65, 35, 110);
    doc.rect(235, 65, 35, 110);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("SERVICIOS INTEGRALES AERONAUTICOS, C.A.", 60, 18);
    doc.text("RECIBO DE PAGO", 135,34);
    doc.line(135, 35, 172, 35);
    let fec_emis : any = new Date(response.datos.fec_emis);
    fec_emis = this.parseDate(fec_emis);
    let fec_inic : any = new Date(response.datos.fec_inic);
    fec_inic = this.parseDate(fec_inic);
    doc.text("Fecha: " + fec_emis, 11, 43);
    doc.text("PERIODO DESDE: " + fec_inic, 75, 43);
    doc.text("HASTA: " + fec_emis, 160, 43);
    doc.text("N° Recibo: " + response.datos.reci_num, 230, 43);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(response.datos.contrato, 135,27);
    let today : any = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var time = hours + ':' + minutes + ' ' + ampm;
    today = this.parseDate(today); 
    doc.text(
      "Fecha: " + today + " " + time,
      228, 26);
    doc.text(
      response.datos.cod_emp + "    " + response.datos.nombre_completo, 
      41, 54);
    doc.text(response.datos.departamento, 110, 60);
    doc.text(response.datos.ci, 150, 54);
    doc.text(response.datos.cargo, 200, 54);
    doc.text(response.datos.cargo, 200, 54);
    let ingreso : any = new Date(response.datos.ingreso);
    ingreso = this.parseDate(ingreso);
    doc.text(ingreso, 220, 60);
    doc.setFont('helvetica', 'bold');
    doc.text("Copia", 260, 20);
    doc.setFontSize(10);
    doc.text("TRABAJADOR: ", 11, 54);
    doc.text("DEPARTAMENTO: ", 76, 60);
    doc.text("CEDULA: ", 130, 54);
    doc.text("CARGO: ", 180, 54);
    doc.text("FECHA DE INGRESO: ", 180, 60);
    doc.setFont('helvetica', 'normal');
    doc.text("CODIGO", 15, 72);
    doc.text("DESCRIPCION", 40, 72);
    doc.text("VALOR AUXILIAR", 133, 72);
    doc.text("ASIGNACIONES", 169, 72);
    doc.text("DEDUCCIONES", 204, 72);
    doc.text("NETO A COBRAR", 238, 72);
    doc.text("Horario o Turno Convenido / Observaciones:", 10, 171);
    doc.line(10, 172, 79, 172);
    doc.setFontSize(9);
    var y = 82;
    var opts = { minimumFractionDigits: 2 };
    var asignaciones = 0;
    var deducciones = 0;
    for (const reglon of response.reglones) {
      doc.text(reglon.codigo, 18, y);
      doc.text(reglon.descripcion, 39, y);
      if (reglon.auxi_num != null){
        var text = reglon.auxi_num.toLocaleString(undefined, opts) + " " + reglon.auxi_cha;
        doc.text(text, 138, y);
      }
      text = reglon.asignaciones.toLocaleString(undefined, opts);
      if (reglon.asignaciones == 0){
        doc.text(text, 179, y);
      }
      else{
        doc.text(text, 173, y);
      }
      text = reglon.deducciones.toLocaleString(undefined, opts);
      if (reglon.deducciones == 0){
        doc.text(text, 214, y);
      }
      else{
        doc.text(text, 209, y);
      }
      asignaciones = asignaciones + reglon.asignaciones;
      deducciones = deducciones + reglon.deducciones;
      y = y + 6;
    }
    var text = asignaciones.toLocaleString(undefined, opts);
    doc.text(text, 172, 171);
    var text = deducciones.toLocaleString(undefined, opts);
    doc.text(text, 208, 171);
    var text = (asignaciones - deducciones).toLocaleString(undefined, opts);
    doc.text(text, 242, 171);
    doc.text('Recibi conforme - "Usar firma', 140, 195);
    doc.text('cédula de identidad".', 140, 200);
    doc.rect(185, 177, 20, 20);
    doc.text("Pulgar Derecho.", 184,200);
    doc.setFont('helvetica', 'bold');
    doc.text("Total Trabajador:", 135, 171);
    doc.save('RECIBO N° ' + response.datos.reci_num + '.pdf');
  }
}
