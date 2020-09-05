import { Component, OnInit } from '@angular/core';
import { Foto } from '../../models/foto';
import 'firebase/firestore';
import { GaleriaServiceService } from 'src/app/servicios/galeria-service.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
/**componente el cual carga las imagenes guardadas en la base de datos */
export class GaleriaComponent implements OnInit {

  //variable fotos el cual sirve para mostrar en la directiva "*ngFor" el cual es un arreglo simple de fotos
  fotos: Foto[]; 
 
  //contructor el cual inicializa por parametro el servicio necesario para llamar la lista de fotos guardados en la base de datos
  constructor(
    private galeriaService:GaleriaServiceService) {
   }

  //ya que usa la interfaz de OnInit este metodo se ejecutar al llamar el componente galeria todo lo que este dentro de dicho metodo
  //sera ejecutado primero teniendo en cuenta que las promesas son asincronas se debe tener encuenta que lo que queremos que se guarden en las variables
  //ocurra dentro de la promesa
  ngOnInit() {
    let s = this.galeriaService.getFotoList();
    s.snapshotChanges().subscribe(data => { //snapshotChanges para tomar cambios en tiempo real de la base de datos sin necesidad de hacer un refresh
      this.fotos = [];
      data.forEach(item => { // recorrido de cada item extraido en la base de datos
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.fotos.push(a as Foto);
      })
    })
  }


}
