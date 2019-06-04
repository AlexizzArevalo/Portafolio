import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  cargada = false;

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-html-e01f0.firebaseio.com/productos_idx.json')
      .subscribe((res: Producto[])=>{
        this.productos = res;
        this.cargada = true;
      });
  }
}
