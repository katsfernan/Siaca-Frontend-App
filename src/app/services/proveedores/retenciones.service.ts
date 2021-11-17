import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoRetencionIva } from 'src/app/models/retencion.interface';

@Injectable({
  providedIn: 'root'
})
export class RetencionesService {

  private _url_base = 'http://127.0.0.1:8000/reportes/retenciones/';


  constructor(private http:HttpClient) {}

    listaPagoRetencionesIva(): Observable<PagoRetencionIva[]>{
      let header = new HttpHeaders({'Authorization':'Token ' + sessionStorage.getItem('token')});
      return this.http.get<PagoRetencionIva[]>(this._url_base, {headers: header});
    }

}
