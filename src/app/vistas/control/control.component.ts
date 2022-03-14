import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  productos:any = [];
  displayedColumns:string[] = ['nombre', 'fechaCreac', 'fechaAct', 'actions'];

  constructor(private router:Router, private pSrv:ProductosService) { }

  async ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        this.productos = await this.pSrv.traerProductos().toPromise();
      } catch (error) {
        // alert("Problema con la base de datos.")
      }
    }
  }
}
