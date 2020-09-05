import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})

export class TareaServiceService {
  tareasRef: AngularFireList<any>;    
  tareaRef: AngularFireObject<any>;   
  

  constructor(private db: AngularFireDatabase) { }


  addTarea(tarea: Tarea) {
    this.tareasRef.push({
      nombreTarea: tarea.nombreTarea,
      descripcion: tarea.descripcion,
      coordenada: tarea.coordenada,
      status: tarea.status
    })
  }

  
  getTarea(id: string) {
    this.tareaRef = this.db.object('tarea-list/' + id);
    return this.tareaRef;
  }


  getTareaList() {
    this.tareasRef = this.db.list('tarea-list');
    return this.tareasRef;
  }  

 
  updateTarea(tarea: Tarea) {
    
    this.tareaRef.update({
      nombreTarea: tarea.nombreTarea,
      descripcion: tarea.descripcion,
      coordenada: tarea.coordenada,
      status: tarea.status
    })
  }  
  updateTareaStatus(tarea: Tarea) {
    this.tareaRef = this.db.object('tarea-list/'+tarea.$key);
    this.tareaRef.update({
      coordenada: tarea.coordenada,
      descripcion: tarea.descripcion,
      nombreTarea: tarea.nombreTarea,
      status: tarea.status
    })
  }  

  deleteTarea(id: string) { 
    this.tareaRef = this.db.object('tarea-list/'+id);
    this.tareaRef.remove();
  }
  
}