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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AnunciosComponent } from './components/user/anuncios/anuncios.component';
import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api';
import { RecibosDePagoComponent } from './components/user/recibos-de-pago/recibos-de-pago.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FacturasDetalleComponent} from './components/cliente/facturas/facturas-detalle/facturas-detalle.component'
import { FacturasComponent } from './components/cliente/facturas/listaFacturas/facturas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { ListaRetencionesComponent } from './components/proveedor/retenciones/lista-retenciones/lista-retenciones.component';
import { ListaRetencionesISLRComponent } from './components/proveedor/retencionesISLR/lista-retenciones/lista-retencionesISLR.component';

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
    FormulariosComponent,
    AnunciosComponent,
    RecibosDePagoComponent,
    FacturasComponent,
    FacturasDetalleComponent,
    ModalComponent,
    ListaRetencionesComponent,
    ListaRetencionesISLRComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    //PdfViewerModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
