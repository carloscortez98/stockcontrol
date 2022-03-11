import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  traerProductos() {
    return this.http.get(environment.api+"productos")
  }

  traerPorId(id:any) {
    return this.http.get(environment.api+"productos"+"/"+id)
  }

  crear(producto:any) {
    return this.http.post(environment.api+"productos", producto)
  }

  actualizar(id:any, producto:any) {
    return this.http.put(environment.api+"productos"+"/"+id, producto)
  }

  eliminar(id:any) {
    return this.http.delete(environment.api+"productos"+"/"+id)
  }

  traerCategorias() {
    return this.http.get(environment.api+"categorias")
  }

  crearCat(categoria:any) {
    return this.http.post(environment.api+"categorias", categoria)
  }

  eliminarCat(id:any) {
    return this.http.delete(environment.api+"categorias"+"/"+id)
  }

}
