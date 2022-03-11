import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  iniciar(usuario) {
    return this.http.post(environment.api+"usuarios"+"/iniciar", usuario).toPromise();
  }
  
}
