import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Foto } from '../models/foto';

@Injectable({
  providedIn: 'root'
})
export class GaleriaServiceService {

  fotosRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  fotoRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Student
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

  // Update Student Object
  updateFoto(foto: Foto) {
    this.fotoRef.update({
      imgUrl: foto.url
    })
  }  

  // Delete Student Object
  deleteFoto(id: string) { 
    this.fotoRef = this.db.object('fotos/'+id);
    this.fotoRef.remove();
  }
  
}