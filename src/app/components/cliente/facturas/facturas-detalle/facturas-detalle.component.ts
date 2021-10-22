import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from 'src/app/services/clientes/facturas.service';
import { FacturaVentaReporte } from '../../../../models/factura.interface';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';


@Component({
  selector: 'app-facturas-detalle',
  templateUrl: './facturas-detalle.component.html',
  styleUrls: ['./facturas-detalle.component.scss']
})
export class FacturasDetalleComponent implements OnInit {

  public facturaDetalle = <FacturaVentaReporte> {};
  @ViewChild('modalInfo') modal_info!: TemplateRef<any>;

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
    let facturaId: number  = parseInt(this.activerouter.snapshot.paramMap.get('id')!);
    this.service.facturaDetalle(facturaId).subscribe(response => this.facturaDetalle = response)
    console.log(JSON.stringify(this.facturaDetalle))
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
    
  }

