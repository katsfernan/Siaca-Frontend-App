import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Archivo } from 'src/app/models/archivo.interface';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {


  constructor(private http:HttpClient) { 
  }

  getArchivosAdministrativos(): Observable<Archivo[]> {
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Archivo[]>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/?tipo=Administrativo", {headers: header});
  }

  getArchivosOperacionales(): Observable<Archivo[]> {
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Archivo[]>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/?tipo=Operacional", {headers: header});
  }

  getFormularios(): Observable<Archivo[]> {
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Archivo[]>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/?tipo=Formulario", {headers: header});
  }

  getPdf(): Observable<Blob> {
    var id = sessionStorage.getItem("id_empleado");
    var direccion= sessionStorage.getItem("url");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Blob>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/"+direccion, {headers: header});
  }

  
}
