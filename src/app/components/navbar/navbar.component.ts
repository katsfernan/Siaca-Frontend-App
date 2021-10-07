import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User, UserResponse } from 'src/app/models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(public auth: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  

  //Metodo para cerrar sesion en el boton del navbar 
  onLogout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
