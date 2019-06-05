import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { Item } from '../interfaces/item.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  cargada = false;
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve, reject)=>{
      this.http.get('https://angular-html-e01f0.firebaseio.com/productos_idx.json')
      .subscribe((res: Producto[])=>{
        this.productos = res;
        this.cargada = true;
        resolve();
      });
    });
    
  }

  public cargarItem(id: String){
    return this.http.get(`https://angular-html-e01f0.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto( termino: string){
    if(this.productos.length===0){
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      });
    }
    this.filtrarProductos(termino);
  }

  filtrarProductos(termino: string){
    this.productosFiltrados = [];
    this.productos.forEach(prod=>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      const categoriaLower = prod.categoria.toLocaleLowerCase();
      if(tituloLower.indexOf(termino.toLowerCase())>=0 ||categoriaLower.indexOf(termino.toLowerCase())>=0){
        this.productosFiltrados.push(prod);
      }
    });
  }
}
