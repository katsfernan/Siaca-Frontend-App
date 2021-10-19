import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Anuncio, Mensaje, Actualizar } from '../models/anuncios.interface';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {


  constructor(private http:HttpClient) {
   }

 // post para hacer nuevos anuncios
  nuevoAnuncio(form:Anuncio): Observable<any>{
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.post<any>('http://127.0.0.1:8000/anuncios/?departamento='+form.id, form, {headers: header});
  }

  //get que devuelve los anuncios de un usuario
  anuncios(): Observable<Mensaje[]>{
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Mensaje[]>('http://127.0.0.1:8000/empleado/'+id+'/anuncio/', {headers: header});
  }

  actualizarAnuncio(form: Actualizar) : Observable<any>{
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.post<any>('http://127.0.0.1:8000/empleado/'+id+'/anuncio/', form , {headers: header});
  }
}
