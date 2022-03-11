import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { IniciarComponent } from './vistas/iniciar/iniciar.component';
import { CrearComponent } from './vistas/crear/crear.component';
import { ActualizarComponent } from './vistas/actualizar/actualizar.component';
import { CategoriasComponent } from './vistas/categorias/categorias.component';
import { ListaComponent } from './vistas/lista/lista.component';
import { ControlComponent } from './vistas/control/control.component';
import { HistorialComponent } from './vistas/control/historial/historial.component';
import { RefreshComponent } from './vistas/refresh/refresh.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IniciarComponent,
    CrearComponent,
    ActualizarComponent,
    CategoriasComponent,
    ListaComponent,
    ControlComponent,
    HistorialComponent,
    RefreshComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSidenavModule, MatSnackBarModule, MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
