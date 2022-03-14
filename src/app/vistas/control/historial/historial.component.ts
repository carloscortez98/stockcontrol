import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  productos:any = [];

  constructor(private route:ActivatedRoute, private router:Router, private pSrv:ProductosService) { }

  async ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        let id = this.route.snapshot.paramMap.get('id')
        this.productos = await this.pSrv.traerPorId(id).toPromise()
      } catch (error) {
        alert("Problema con la base de datos.")
      }
    }
  }
}
