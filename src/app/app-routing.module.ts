import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "src/app/components/user/login/login.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { DocComponent } from "src/app/components/user/doc/doc.component";
import { ManualesComponent } from "src/app/components/user/doc/manuales/manuales.component";
import { ManualesAdministrativosComponent } from "src/app/components/user/doc/manuales-administrativos/manuales-administrativos.component";
import { FormulariosComponent } from "src/app/components/user/doc/formularios/formularios.component";

const routes: Routes = [

{path: "login", component: LoginComponent},
{path: "home", component: HomeComponent},
{path: "doc", component: DocComponent},
{path: "manuales", component: ManualesComponent},
{path: "manuales-administrativos", component: ManualesAdministrativosComponent},
{path: "formularios", component: FormulariosComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
