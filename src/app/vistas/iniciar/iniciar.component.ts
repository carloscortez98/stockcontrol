import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { DatosService } from 'src/app/servicios/datos.service';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.css']
})
export class IniciarComponent implements OnInit {

  formulario: FormGroup;

  constructor(private form:FormBuilder, private router:Router, private uSrv:UsuariosService, private _snackBar:MatSnackBar, private datosSrv:DatosService) {
    this.formulario = this.form.group({
      usuario: ["", [Validators.required]],
      contraseña: ["", [Validators.required]]
    })
  }

  async iniciar() {
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/lista")
    } else {
      try {
        const respuesta:any = await this.uSrv.iniciar(this.formulario.value)
        if (respuesta["error"]) {
          this._snackBar.open(respuesta["mensaje"], 'Cerrar', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
          });
        } else {
          localStorage.setItem("token", respuesta["token"])
          this._snackBar.open(respuesta["mensaje"], 'Cerrar', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
          });
          this.router.navigateByUrl("/lista")
          this.datosSrv.logeado = true;
        }
      } catch (error) {
        this._snackBar.open('Problema con la base de datos', 'Cerrar', {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 5000
        });
      }
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/lista")
    }
    this.datosSrv.logeado = false;
  }

}
