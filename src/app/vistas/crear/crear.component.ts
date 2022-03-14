import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/productos.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  formulario:FormGroup;
  categorias:any = [];
  divFechaCreac:boolean = false;

  constructor(private form:FormBuilder, private router:Router, private pSrv:ProductosService, private _snackBar:MatSnackBar) {
    this.formulario = this.form.group({
      nombre: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-ZÑñ ]*$')
        ])],
      precio: ["", Validators.compose([
        Validators.required,
        Validators.pattern('^(?:[1-9][0-9]{0,4}?|100000)$')
        ])],
      stock: ["", Validators.compose([
        Validators.required,
        Validators.pattern('^(?:[1-9][0-9]{0,4}?|100000)$')
        ])],
      categoria: ["", [Validators.required]],
      fechaCreac: ["", Validators.compose([
        Validators.pattern('^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\d)?\\d{2})$|^(?:29(\/|-|\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$')
      ])]
    })
  }

  async crear() {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        var fechaCreac = new Date();
        var diaCreac = fechaCreac.getDate();
        var diaString = diaCreac.toString();
        if (diaString.length <= 1) {
          diaString = "0" + diaCreac
        }
        var mesCreac = fechaCreac.getMonth() + 1;
        var mesString = mesCreac.toString();
        if (mesString.length <= 1) {
          mesString = "0" + mesCreac
        }
        var añoCreac = fechaCreac.getFullYear();
        var fechaCreacForm = diaString+"/"+mesString+"/"+añoCreac

        if (this.formulario.value.fechaCreac == "" || this.formulario.value.fechaCreac == null) {
          this.formulario.value.fechaCreac = fechaCreacForm
        }

        const producto:any = await this.pSrv.crear(this.formulario.value).toPromise();

        if (producto["estado"] == "Error") {
          this._snackBar.open(producto["mensaje"], 'Cerrar', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
          });
        } else {
          this._snackBar.open(producto["mensaje"], 'Cerrar', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
          });
          this.router.navigateByUrl("/lista")
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

  async ngOnInit() {
    const fechaCreac = new Date();
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        this.categorias = await this.pSrv.traerCategorias().toPromise()
      } catch (error) {
        // alert("Problema con la base de datos.")
      }
    }
  }
}
