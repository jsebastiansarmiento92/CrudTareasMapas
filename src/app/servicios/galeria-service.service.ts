import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Foto } from '../models/foto';

@Injectable({
  providedIn: 'root'
})
export class GaleriaServiceService {

  fotosRef: AngularFireList<any>;   
  fotoRef: AngularFireObject<any>;   
  

  constructor(private db: AngularFireDatabase) { }


  addFoto(foto: Foto) {
    this.fotosRef.push({
      imgUrl: foto.url,
    })
  }

  getFoto(id: string) {
    this.fotoRef = this.db.object('fotos/' + id);
    return this.fotoRef;
  }


  getFotoList() {
    this.fotosRef = this.db.list('fotos');
    return this.fotosRef;
  }  


  updateFoto(foto: Foto) {
    this.fotoRef.update({
      imgUrl: foto.url
    })
  }  


  deleteFoto(id: string) { 
    this.fotoRef = this.db.object('fotos/'+id);
    this.fotoRef.remove();
  }
  
}