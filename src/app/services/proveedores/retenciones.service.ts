import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoRetencionISLR, PagoRetencionIva } from 'src/app/models/retencion.interface';
import { Proveedor } from '../../models/user.interface';

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
      if (typeof fecha_i == 'undefined'){
        fecha_i = NONE_TYPE
      }
      else{
        fechas = fechas.append('fecha_i', JSON.stringify(fecha_i) )
      }

      if (typeof fecha_f == 'undefined'){
        fecha_f = NONE_TYPE
      }
      else{
        fechas = fechas.append('fecha_f', JSON.stringify(fecha_f))
      }

      return this.http.get<any>(this._url_base + 'retencionesISLR/' , {headers: header, params: fechas})
    }

    
    listaPagoRetencionesISLR_Empleados(fecha_i:any, fecha_f:any, prov_cod: any): Observable <any>{
      let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
      let parametros = new HttpParams();
      if (typeof fecha_i == 'undefined'){
        fecha_i = NONE_TYPE
      }
      else{
        parametros = parametros.append('fecha_i', JSON.stringify(fecha_i) )
      }

      if (typeof fecha_f == 'undefined'){
        fecha_f = NONE_TYPE
      }
      else{
        parametros = parametros.append('fecha_f', JSON.stringify(fecha_f))
      }

      parametros = parametros.append ('prov_cod' , prov_cod)

      return this.http.get<any>(this._url_base + 'retencionesISLR/' , {headers: header, params: parametros})
    }



    listaProveedores(): Observable<Proveedor[]> {
      let header = new HttpHeaders({'Authorization':'Token ' + sessionStorage.getItem('token')});
      return this.http.get<Proveedor[]>(this._url_base + 'proveedoresList/', {headers: header});
    }

}
