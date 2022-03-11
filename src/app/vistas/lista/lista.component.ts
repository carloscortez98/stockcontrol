import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  productos: any = [];
  displayedColumns: string[] = ['nombre', 'precio', 'stock', 'categoria', 'fechaCreac', 'actions'];

  constructor(private router:Router, private pSrv:ProductosService, private _snackBar:MatSnackBar) { }

  async eliminar(id:any) {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        const eliminar:any = await this.pSrv.eliminar(id).toPromise();
        this._snackBar.open(eliminar["mensaje"], 'Cerrar', {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 5000
        });
        this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/lista']); });
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
        this.productos = await this.pSrv.traerProductos().toPromise()
      } catch (error) {
        // alert("Problema con la base de datos.")
      }
    }
  }

}
