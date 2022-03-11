import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { DatosService } from 'src/app/servicios/datos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router, private _snackBar:MatSnackBar, public datosSrv:DatosService) { }

  cerrarsesion() {
    try {
      localStorage.clear();
      this._snackBar.open('Cerraste Sesion', 'Cerrar', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 5000
      });
      this.router.navigateByUrl("/");
      this.datosSrv.logeado = false;
    } catch (error) {
      this._snackBar.open('Problema con la base de datos', 'Cerrar', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 5000
      });
    }
  }

  ngOnInit() {
    this.datosSrv.logeado = true;
  }

}
