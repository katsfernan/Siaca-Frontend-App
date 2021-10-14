import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User, UserResponse } from 'src/app/models/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public data = sessionStorage.getItem('rol');
  public permisos = sessionStorage.getItem('permisos');
  public empleado = sessionStorage.getItem('id_empleado');
  
@Input() dataEntrante:any;

  constructor(public auth: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  
  //Metodo para cerrar sesion
  outLogin(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }




}
