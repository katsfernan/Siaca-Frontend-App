import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacturaVenta, FacturaVentaReporte } from '../../models/factura.interface';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private _url_base = 'http://127.0.0.1:8000/reportes/facturas/';


  constructor(private http:HttpClient) {}

    listaFacturas(): Observable<FacturaVenta[]>{
      let header = new HttpHeaders({'Authorization':'Token ' + sessionStorage.getItem('token')});
      return this.http.get<FacturaVenta[]>(this._url_base, {headers: header});
    }

    facturaDetalle(id: number = 0): Observable<FacturaVentaReporte> {
      let header = new HttpHeaders({'Authorization':'Token ' + sessionStorage.getItem('token')});
      return this.http.get<FacturaVentaReporte>(this._url_base + `detalle/${id}` , {headers: header})
    }

  
}
