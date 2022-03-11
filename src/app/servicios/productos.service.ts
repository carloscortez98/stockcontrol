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

  traerPorId(id) {
    return this.http.get(environment.api+"productos"+"/"+id)
  }

  crear(producto) {
    return this.http.post(environment.api+"productos", producto)
  }

  actualizar(id, producto) {
    return this.http.put(environment.api+"productos"+"/"+id, producto)
  }

  eliminar(id) {
    return this.http.delete(environment.api+"productos"+"/"+id)
  }

  traerCategorias() {
    return this.http.get(environment.api+"categorias")
  }

  crearCat(categoria) {
    return this.http.post(environment.api+"categorias", categoria)
  }

  eliminarCat(id) {
    return this.http.delete(environment.api+"categorias"+"/"+id)
  }

}
