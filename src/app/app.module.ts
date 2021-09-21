import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DocComponent } from './components/user/doc/doc.component';
import { ManualesComponent } from './components/user/doc/manuales/manuales.component';
import { FiltroPipe } from './pipes/filtro.pipe';

import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ManualesAdministrativosComponent } from './components/user/doc/manuales-administrativos/manuales-administrativos.component';
import { FormulariosComponent } from './components/user/doc/formularios/formularios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    DocComponent,
    ManualesComponent,
    FiltroPipe,
    ManualesAdministrativosComponent,
    FormulariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
