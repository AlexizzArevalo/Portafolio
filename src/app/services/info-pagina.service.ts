import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    console.log('Servicio de infoPagina listo');
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo(){
    console.log('Cargando equipo de trabajo...');
    this.http.get('https://angular-html-e01f0.firebaseio.com/equipo.json')
      .subscribe((resp: any)=>{
        this.cargada = true;
        this.equipo = resp;
      });
  }
}
