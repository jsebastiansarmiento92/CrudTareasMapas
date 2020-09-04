import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})

export class TareaServiceService {
  tareasRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  tareaRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Student
  addTarea(tarea: Tarea) {
    this.tareasRef.push({
      nombreTarea: tarea.nombreTarea,
      descripcion: tarea.descripcion,
      coordenadas: tarea.coordenadas,
      
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

  // Update Student Object
  updateTarea(tarea: Tarea) {
    this.tareaRef.update({
      nombreTarea: tarea.nombreTarea,
      descripcion: tarea.descripcion,
      coordenadas: tarea.coordenadas,
    })
  }  

  // Delete Student Object
  deleteTarea(id: string) { 
    this.tareaRef = this.db.object('tarea-list/'+id);
    this.tareaRef.remove();
  }
  
}