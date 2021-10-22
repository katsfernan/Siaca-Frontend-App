import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {


  constructor(private http:HttpClient) {
   }

  //get que devuelve los recibos de pago de un usuario
  getRecibos(): Observable<any>{
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<any>('http://127.0.0.1:8000/empleado/recibos-de-pago/', {headers: header});
  }

  //get que devuelve un recibo de pago específico antes de la reconversion monetaria
  getRecibo(reci_num: number): Observable<any>{
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<any>('http://127.0.0.1:8000/empleado/recibos-de-pago/'+reci_num.toString(), {headers: header});
  }

  //get que devuelve un recibo de pago específico luego de la reconversion monetaria
  getReciboReconv(reci_num: number): Observable<any>{
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<any>('http://127.0.0.1:8000/empleado/recibos-de-pago-reconv/'+reci_num.toString(), {headers: header});
  }
}
