import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoRetencionISLR, PagoRetencionIva } from 'src/app/models/retencion.interface';

@Injectable({
  providedIn: 'root'
})
export class RetencionesService {

  private _url_base = 'http://127.0.0.1:8000/reportes/';


  constructor(private http:HttpClient) {}

    listaPagoRetencionesIva(): Observable<PagoRetencionIva[]>{
      let header = new HttpHeaders({'Authorization':'Token ' + sessionStorage.getItem('token')});
      return this.http.get<PagoRetencionIva[]>(this._url_base + 'retenciones/', {headers: header});
    }

    listaPagoRetencionesISLR(fecha_i:any, fecha_f:any): Observable <any>{
      let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
      let fechas = new HttpParams();
      fechas = fechas.append('fecha_i', JSON.stringify(fecha_i) )
      fechas = fechas.append('fecha_f', JSON.stringify(fecha_f))
      return this.http.get<any>(this._url_base + 'retencionesISLR/' , {headers: header, params: fechas})
    }

}
