import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserResponse } from 'src/app/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Objeto del forulario para iniciar sesion 
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    user_type: new FormControl('', Validators.required)
  });

   
   public data = sessionStorage.getItem('rol');

  constructor(public auth: LoginService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  //Metodo para iniciar sesion 
  onLogin(form:User){
    this.auth.login(form).subscribe(data =>{
      let dataResponse: UserResponse =data;
      sessionStorage.setItem("token", dataResponse.token);
      sessionStorage.setItem("rol", data.user_data.data.rol.rol_id.toString());
      sessionStorage.setItem("departamento", data.user_data.data.departamento.dep_id.toString());
      sessionStorage.setItem("id", data.user_id.toString());
      console.log(data.user_data.permissions);
      console.log("token", data.token);
      this.router.navigate(['/home']);
    });

  }

   getRol(): any {
    var lista = sessionStorage.getItem("rol");
    console.log("rol", lista);
    this.data = lista;
  }



  

 
}
