import { Component, OnInit } from '@angular/core';
import { Foto } from '../../models/foto';

import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import 'firebase/firestore';
import { GaleriaServiceService } from 'src/app/servicios/galeria-service.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {


  fotos: Foto[]; 
  ocultar: boolean = false; 
  noData: boolean = false;            
  preLoader: boolean = true;  

  constructor(private firestore:AngularFirestore,
    private galeriaService:GaleriaServiceService) {
   }

  ngOnInit() {

    this.dataState();
    let s = this.galeriaService.getFotoList();
    s.snapshotChanges().subscribe(data => { 
      this.fotos = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.fotos.push(a as Foto);
      })
    })
  }

 

  dataState() {     
    this.galeriaService.getFotoList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.ocultar = false;
        this.noData = true;
      } else {
        this.ocultar = true;
        this.noData = false;
      }
    })
  }
}
