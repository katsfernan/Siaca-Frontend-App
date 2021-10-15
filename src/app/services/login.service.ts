import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User, UserResponse } from '../models/user.interface';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

 //variable para el header
  headers = new HttpHeaders();

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { 
    this.headers.append("Authorization", "Token"+ sessionStorage.getItem("token"));
  }


  // Metodo de login
  login(form:User): Observable<UserResponse>{
    return this.http.post<UserResponse>('http://127.0.0.1:8000/login/', form, {headers: this.headers});
  }

  //Metodo de logout
  logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("id_empleado");
    this.loggedIn.next(false);
  }


  //set Token del usuario
  setToken (token:string): void{
    sessionStorage.setItem('token',token);
  }

  //get Token del usuario
  getToken (){
    sessionStorage.getItem('token');
  }

  //Metodo para verfificar que el usuario este log
  getCurrentUser(){
    let user = sessionStorage.getItem('token');
    if(user != null){
      return true;
    }else{
      return false;
    }
  }
  

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

}
