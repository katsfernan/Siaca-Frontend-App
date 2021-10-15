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


  //get que devuelve los manuales administrativos de un usuario
  getArchivosAdministrativos(): Observable<Archivo[]> {
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Archivo[]>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/?tipo=Administrativo", {headers: header});
  }

  //get que devuelve los manuales operativos de un usuario
  getArchivosOperacionales(): Observable<Archivo[]> {
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Archivo[]>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/?tipo=Operacional", {headers: header});
  }

  //get que devuelve los formularios de un usuario
  getFormularios(): Observable<Archivo[]> {
    var id = sessionStorage.getItem("id_empleado");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Archivo[]>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/?tipo=Formulario", {headers: header});
  }

  //get que devuelve la ruta de un archivo especifico
  getPdf(): Observable<Blob> {
    var id = sessionStorage.getItem("id_empleado");
    var direccion= sessionStorage.getItem("url");
    let header = new HttpHeaders({'Authorization': 'Token ' + sessionStorage.getItem('token')});
    return this.http.get<Blob>("http://127.0.0.1:8000/empleado/"+id+"/archivos-gestion-calidad/"+direccion, {headers: header});
  }

  
}
