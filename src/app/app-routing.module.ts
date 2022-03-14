import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IniciarComponent } from './vistas/iniciar/iniciar.component';
import { CrearComponent } from './vistas/crear/crear.component';
import { ActualizarComponent } from './vistas/actualizar/actualizar.component';
import { CategoriasComponent } from './vistas/categorias/categorias.component';
import { ListaComponent } from './vistas/lista/lista.component';
import { ControlComponent } from './vistas/control/control.component';
import { HistorialComponent } from './vistas/control/historial/historial.component';
import { RefreshComponent } from './vistas/refresh/refresh.component';

const routes: Routes = [{path:"", component:IniciarComponent},
                        {path:"crear", component:CrearComponent},
                        {path:"lista/:id", component:ActualizarComponent},
                        {path:"categorias", component:CategoriasComponent},
                        {path:"lista", component:ListaComponent},
                        {path:"control", component:ControlComponent},
                        {path:"control/:id", component:HistorialComponent},
                        {path:"refresh", component:RefreshComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
