import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/productos.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  formulario:FormGroup;
  categorias:any = []
  productos:any = []
  displayedColumns:string[] = ['nombre', 'actions'];

  constructor(private form:FormBuilder, private router:Router, private pSrv:ProductosService, private _snackBar:MatSnackBar) {
    this.formulario = this.form.group({
      nombre: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z ]*$')
        ])]
      })
  }

  async crearCat() {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        const categoria:any = await this.pSrv.crearCat(this.formulario.value).toPromise();
        if (categoria["estado"] == "Error") {
          this._snackBar.open(categoria["mensaje"], 'Cerrar', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
          });
        } else {
          this._snackBar.open(categoria["mensaje"], 'Cerrar', {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
          });
          this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/categorias']); });
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

  async eliminarCat(id:any) {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        const eliminarCat:any = await this.pSrv.eliminarCat(id).toPromise();
        this._snackBar.open(eliminarCat["mensaje"], 'Cerrar', {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 5000
        });
        this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/categorias']); });
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
