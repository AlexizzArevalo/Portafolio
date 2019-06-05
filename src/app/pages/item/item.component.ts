import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item = {};
  id: String;
  cargado = false;

  constructor(private route: ActivatedRoute, public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros=>{
      this.id = parametros['id'];
      this.productoService.cargarItem(this.id).subscribe((res: Item)=>{
        this.item = res;
        this.cargado = true;
      });      
    })
  }

}
