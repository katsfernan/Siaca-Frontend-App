import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: LoginService, private router: Router){}


  //Metodo para proteger las vistas 
  canActivate(){
    if (this.auth.getCurrentUser() == true){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
