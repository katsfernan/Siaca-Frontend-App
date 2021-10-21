import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "src/app/components/user/login/login.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { DocComponent } from "src/app/components/user/doc/doc.component";
import { ManualesComponent } from "src/app/components/user/doc/manuales/manuales.component";
import { ManualesAdministrativosComponent } from "src/app/components/user/doc/manuales-administrativos/manuales-administrativos.component";
import { FormulariosComponent } from "src/app/components/user/doc/formularios/formularios.component";
import { AnunciosComponent } from './components/user/anuncios/anuncios.component';
import { AuthGuard } from './guards/auth.guard';
import { RecibosDePagoComponent } from './components/user/recibos-de-pago/recibos-de-pago.component';

const routes: Routes = [

{path: 
  "login", 
  component: LoginComponent},

{path: 
  "home", 
  component: HomeComponent, 
  canActivate:[AuthGuard]},
  
{path: 
  "doc", 
  component: DocComponent, 
  canActivate:[AuthGuard]},

{path: 
  "manuales", 
  component: ManualesComponent, 
  canActivate:[AuthGuard]},

{path: 
  "manuales-administrativos", 
  component: ManualesAdministrativosComponent, 
  canActivate:[AuthGuard]},

{path: 
  "formularios", 
  component: FormulariosComponent, 
  canActivate:[AuthGuard]},

{path: 
  "anuncios", 
  component: AnunciosComponent, 
  canActivate:[AuthGuard]},
{path:
  "recibos-de-pago",
  component: RecibosDePagoComponent,
  canActivate:[AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
