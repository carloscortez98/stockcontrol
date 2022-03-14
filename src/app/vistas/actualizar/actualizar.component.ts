import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/productos.service';
import * as $ from 'jquery';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  formulario:FormGroup;
  productos: any = [];
  categorias: any = [];
  divFechaAct:boolean = false;
  calculadora: any = [];

  abrirCalc() {
    if (this.calculadora) {
      this.calculadora = false;
      $("#abrirCalc").html("Ocultar");
    } else {
      this.calculadora = true;
      $("#abrirCalc").html("Calculadora");
    }
  }

  constructor(private route:ActivatedRoute, private form:FormBuilder, private router:Router, private pSrv:ProductosService, private _snackBar:MatSnackBar) {
    this.formulario = this.form.group({
      precio: ["", Validators.compose([
        Validators.pattern('^(?:[1-9][0-9]{0,4}?|100000)$')
        ])],
      stock: ["", Validators.compose([
        Validators.pattern('^(?:[1-9][0-9]{0,4}?|100000)$')
        ])],
      categoria: [""],
      fechaAct: ["", Validators.compose([
        Validators.pattern('^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\d)?\\d{2})$|^(?:29(\/|-|\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$')
      ])]
    })
  }

  async actualizar() {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        let id = this.route.snapshot.paramMap.get('id')
        var fechaAct = new Date();
        var diaAct = fechaAct.getDate();
        var diaString = diaAct.toString();
        if (diaString.length <= 1) {
          diaString = "0" + diaAct
        }
        var mesAct = fechaAct.getMonth() + 1;
        var mesString = mesAct.toString();
        if (mesString.length <= 1) {
          mesString = "0" + mesAct
        }
        var añoAct = fechaAct.getFullYear();
        var fechaActForm = diaString+"/"+mesString+"/"+añoAct

        if (this.formulario.value.precio == "" || this.formulario.value.precio == null) {
          this.formulario.value.precio = this.productos.precio
        }
        if (this.formulario.value.stock == "" || this.formulario.value.stock == null) {
          this.formulario.value.stock = this.productos.stock
        }
        if (this.formulario.value.categoria == "") {
          this.formulario.value.categoria = this.productos.categoria
        }
        if (this.formulario.value.fechaAct == "" || this.formulario.value.fechaAct == null) {
          this.formulario.value.fechaAct = fechaActForm
        }

        const producto:any = await this.pSrv.actualizar(id, this.formulario.value).toPromise();

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
          })
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

  sumar() {
    var operador1:any = $("#operador1").val();
    var operador2:any = $("#operador2").val();
    var resultado = $("#resultado").val();
    var operacion = (operador1 * 1) + (operador2 * 1)
    if (isNaN(operacion)) {
      $("#resultado").val("Por favor opere sólo con números.")
    } else {
      $("#resultado").val(operacion);
    }
  }

  restar() {
    var operador1:any = $("#operador1").val();
    var operador2:any = $("#operador2").val();
    var resultado = $("#resultado").val();
    var operacion = (operador1 - operador2)
    if (isNaN(operacion)) {
      $("#resultado").val("Por favor opere sólo con números.")
    } else {
      $("#resultado").val(operacion);
    }
  }

  multiplicar() {
    var operador1:any = $("#operador1").val();
    var operador2:any = $("#operador2").val();
    var resultado = $("#resultado").val();
    var operacion = (operador1 * operador2)
    if (isNaN(operacion)) {
      $("#resultado").val("Por favor opere sólo con números.")
    } else {
      $("#resultado").val(operacion);
    }
  }

  dividir() {
    var operador1:any = $("#operador1").val();
    var operador2:any = $("#operador2").val();
    var resultado = $("#resultado").val();
    var operacion = (operador1 / operador2)
    if (isNaN(operacion)) {
      $("#resultado").val("Por favor opere sólo con números.")
    } else {
      $("#resultado").val(operacion);
    }
  }

  limpiar() {
    $("#operador1").val("");
    $("#operador2").val("");
    $("#resultado").val("");
  }

  async ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/")
    } else {
      try {
        this.categorias = await this.pSrv.traerCategorias().toPromise()
        let id = this.route.snapshot.paramMap.get('id')
        this.productos = await this.pSrv.traerPorId(id).toPromise()
      } catch (error) {
        this._snackBar.open('Problema con la base de datos', 'Cerrar', {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 5000
        });
      }
    }
  }
}
